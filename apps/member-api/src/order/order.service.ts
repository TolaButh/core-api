import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  IPagination,
  IPaginationOptions,
  paginate,
} from '@app/common/database/pagination';
import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';
import { Users } from '@app/common/entities/Users';
import { Orders } from '@app/common/entities/Orders';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Transactions } from '@app/common/entities/Transactions';
import { AdminNotifications } from '@app/common/entities/AdminNotifications';
import { Services } from '@app/common/entities/Services';
import { UserDto } from '@app/common/dto/user.dto';
import { NO, YES } from '@app/common/constants/status';
import { dayjsTz } from '@app/common/utils/dayjs';
import { ApiProviders } from '@app/common/entities/ApiProviders';
import { I18nService } from 'nestjs-i18n';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { WORKER } from '@app/common/constants/modules';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
    @InjectRepository(AdminNotifications)
    private readonly adminNotificationRepository: Repository<AdminNotifications>,
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,

    @InjectRepository(ApiProviders)
    private readonly apiProRepository: Repository<ApiProviders>,
    private readonly i18nService: I18nService,
    private dataSource: DataSource,

    @Inject(process.env.SITE_NAME + "_" + WORKER) private readonly worker: ClientProxy,

  ) {}

  async pagination(
    options: IPaginationOptions,
    user: Users,
  ): Promise<IPagination<Orders>> {
    try {
      const query = {
        where: { userId: user.id },
        order: {
          id: 'DESC',
        },
      };
      return await paginate<Orders>(this.orderRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }

  async paginationStatus(
    options: IPaginationOptions,
    user: Users,
    status: number,
  ): Promise<IPagination<Orders>> {
    try {
      const query = {
        where: { userId: user.id, status },
        order: {
          id: 'DESC',
        },
      };
      return await paginate<Orders>(this.orderRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }

  async orderTransaction(
    dto: CreateOrderDto,
    userDto: UserDto,
  ): Promise<{ isSuccess: Boolean; message: string; redirectTo?: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager.findOne(Users, {
      where: { id: userDto.id },
    });

    let order_id = null
    try {
      const service = await this.servicesRepository.findOne({
        where: { id: dto.serviceId, status: 1 },
        relations: ['category'],
      });

      const apiProvider = await queryRunner.manager.findOne(ApiProviders, {
        where: { id: service.apiProviderId },
      });

      if (!service) {
        throw new NotFoundException('Service not found');
      }

      if (!dto.link) {
        throw new BadRequestException('Invalid URL');
      }

      if (dto.quantity < service.min || dto.quantity > service.max) {
        throw new BadRequestException('Invalid quantity');
      }

      const price = (service.pricePerK / 1000) * dto.quantity;
      if (user.balance < price) {
        return {
          isSuccess: false,
          message: this.i18nService.t('test.ORDER_TRANSACTION', {
            lang: user.countryCode.toLocaleLowerCase(),
          }),
          redirectTo: '/path-to-deposit',
        };
      }

      let before  = user.balance

      await queryRunner.manager.decrement(
        Users,
        { id: user.id },
        'balance',
        price,
      );

      const transaction = new Transactions();
      transaction.userId = user.id;
      transaction.amount = price;
      transaction.postBalance = before
      transaction.trxType = '-';
      transaction.details = `Order for ${service.name}`;
      transaction.trx = this.generateTrx();
      transaction.remark = 'order';
      transaction.createdAt = dayjsTz().toDate();
      transaction.updatedAt = dayjsTz().toDate();
      await queryRunner.manager.save(transaction);

      const order = new Orders();
      order.userId = user.id;
      order.categoryId = service.category.id;
      order.serviceId = dto.serviceId;
      order.apiServiceId = service.apiServiceId ?? NO;
      order.apiProviderId = service.apiProviderId ?? NO;
      order.link = dto.link;
      order.quantity = dto.quantity;
      order.price = price;
      order.cost = service.cost;
      (order.remain = dto.quantity), (order.type = service.category.type);
      if (apiProvider) order.rate = apiProvider.rate;
      if (dto.add_on) order.addOn = JSON.stringify(dto.add_on);
      order.apiOrder = service.apiServiceId ? YES : NO;
      order.createdAt = dayjsTz().toDate();
      order.updatedAt = dayjsTz().toDate();
      await queryRunner.manager.save(order);

      order_id = order.id

      const adminNotification = new AdminNotifications();
      adminNotification.userId = user.id;
      adminNotification.title = `New order request for ${service.name}`;
      adminNotification.clickUrl = `/admin/orders/details/${order.id}`;
      adminNotification.createdAt = dayjsTz().toDate();
      adminNotification.updatedAt = dayjsTz().toDate();
      await queryRunner.manager.save(adminNotification);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    if(order_id){
      const ob = await this.worker.emit(
        'placeOrder',
        {
          order_id: order_id
        },
      );
     
    }
    return {
      isSuccess: true,
      message: this.i18nService.t('test.ORDER_SUCCESS', {
        lang: user.countryCode.toLocaleLowerCase(),
      }),
    };
  }

  generateTrx(length: number = 12): string {
    const characters = 'ABCDEFGHJKMNOPQRSTUVWXYZ123456789';
    const charactersLength = characters.length;
    let randomString = '';
    for (let i = 0; i < length; i++) {
      randomString += characters[Math.floor(Math.random() * charactersLength)];
    }
    return randomString;
  }
}
