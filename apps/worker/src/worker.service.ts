import {
  API_ORDER_NOT_PLACE,
  ORDER_CANCELLED,
  ORDER_COMPLETED,
  ORDER_PROCESSING,
  ORDER_REFUNDED,
} from '@app/common/constants/status';
import { GeneralSettings } from '@app/common/entities/GeneralSettings';
import { Orders } from '@app/common/entities/Orders';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiProviders } from '@app/common/entities/ApiProviders';
import { Services } from '@app/common/entities/Services';
import { ProxyServerService } from '@app/common/proxy-server/proxy-server.service';
import { Transactions } from '@app/common/entities/Transactions';
import { dayjsTz } from '@app/common/utils/dayjs';
import { Users } from '@app/common/entities/Users';

interface IAddOn {
  comments?: string;
  usernames?: string;
  username?: string;
  answer_number?: string;
  min?: number;
  max?: number;
  posts?: string;
  delay?: string;
  expiry?: string;
}

@Injectable()
export class WorkerService {
  private readonly logger: Logger = new Logger(WorkerService.name);

  constructor(
    @InjectRepository(Orders)
    private readonly orderRepo: Repository<Orders>,
    @InjectRepository(ApiProviders)
    private readonly apiProviderRepo: Repository<ApiProviders>,
    @InjectRepository(GeneralSettings)
    private readonly generalSettingRepo: Repository<GeneralSettings>,
    private readonly httpService: HttpService,
    @InjectRepository(Services)
    private readonly serviceRepository: Repository<Services>,
    private readonly proxy: ProxyServerService,
    private readonly dataSource: DataSource,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async placeOrder(data: any) {
    try {
      this.logger.log(
        JSON.stringify({
          message: 'placeOrderToApiV2',
          data: { date: new Date() },
        }),
      );
      const order = await this.orderRepo.findOne({
        where: {
          id: data.order_id,
          apiProviderId: Not(API_ORDER_NOT_PLACE),
          orderPlacedToApi: API_ORDER_NOT_PLACE,
        },
      });

      const general = await this.generalSettingRepo.findOne({
        where: { id: 1 },
      });
      general.lastCron = new Date();
      await this.generalSettingRepo.save(general);

      try {
        let provider = await this.apiProviderRepo.findOne({
          where: { id: order.apiProviderId },
        });
        let service = await this.serviceRepository.findOne({
          where: {id: order.serviceId}
        })
        
        let response:any;
        const addOn: IAddOn = JSON.parse(order.addOn);
       
        if(service.type == "Default"){
          response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'add',
              service: order.apiServiceId,
              link: order.link,
              quantity: order.quantity,
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();

        }else if(service.type == "Package"){
          response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'add',
              service: order.apiServiceId,
              link: order.link,
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();

        }else if(service.type == "Custom Comments"){
          response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'add',
              service: order.apiServiceId,
              link: order.link,
              comments: addOn.comments
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();
        }else if(service.type == "Mentions Custom List"){
          response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'add',
              service: order.apiServiceId,
              link: order.link,
              usernames: addOn.usernames
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();
        }else if(service.type == "Mentions User Followers"){
          response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'add',
              service: order.apiServiceId,
              link: order.link,
              quantity: order.quantity,
              username: addOn.username
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();
        }else if(service.type == "Comment Likes"){
          response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'add',
              service: order.apiServiceId,
              link: order.link,
              quantity: order.quantity,
              username: addOn.username
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();
        }else if(service.type == "Poll"){
          response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'add',
              service: order.apiServiceId,
              link: order.link,
              quantity: order.quantity,
              answer_number: addOn.answer_number
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();
        }else if(service.type == "Subscriptions"){
          response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'add',
              service: order.apiServiceId,
              username: addOn.username,
              min: addOn.min,
              max: addOn.max,
              posts: addOn.posts,
              delay: addOn.delay,
              expiry: addOn.expiry,
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();
        }
      

        const responseData = response.data;
        if (responseData.error) {
          console.error(`Error: ${responseData.error}`);
          if (
            new String(responseData.error).includes(
              'Not enough funds on balance',
            ) ||
            new String(responseData.error).includes(
              'neworder.error.not_enough_funds',
            )
          ) {
            return;
          }
          order.remark = responseData.error;
          order.orderPlacedToApi = 1;
          order.status = ORDER_REFUNDED;
          await this.orderRepo.save(order);
          await this.Refunded(order.userId, order.price);
          return;
        }

        order.status = ORDER_PROCESSING;
        order.orderPlacedToApi = 1;
        order.apiOrderId = responseData.order;
        await this.orderRepo.save(order);
      } catch (error) {
        // console.log(error)
      }
    } catch (error) { }
  }
  async placeOrderToApi() {
    try {
      this.logger.log(
        JSON.stringify({
          message: 'placeOrderToApiV1',
          data: { date: new Date() },
        }),
      );
      const apiOrders = await this.orderRepo.find({
        where: {
          apiProviderId: Not(API_ORDER_NOT_PLACE),
          orderPlacedToApi: API_ORDER_NOT_PLACE,
        },
      });

      const general = await this.generalSettingRepo.findOne({
        where: { id: 1 },
      });
      general.lastCron = new Date();
      await this.generalSettingRepo.save(general);

      for (const order of apiOrders) {
        try {
          let provider = await this.apiProviderRepo.findOne({
            where: { id: order.apiProviderId },
          });
          
          let service = await this.serviceRepository.findOne({
            where: {id: order.serviceId}
          })
          
          let response=null;
          const addOn: IAddOn = JSON.parse(order.addOn);
          
          if(service.type == "Default"){
            response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'add',
                service: order.apiServiceId,
                link: order.link,
                quantity: order.quantity,
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();
  
          }else if(service.type == "Package"){
            response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'add',
                service: order.apiServiceId,
                link: order.link,
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();
  
          }else if(service.type == "Custom Comments"){
            response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'add',
                service: order.apiServiceId,
                link: order.link,
                comments: addOn.comments
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();
          }else if(service.type == "Mentions Custom List"){
            response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'add',
                service: order.apiServiceId,
                link: order.link,
                usernames: addOn.usernames
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();
          }else if(service.type == "Mentions User Followers"){
            response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'add',
                service: order.apiServiceId,
                link: order.link,
                quantity: order.quantity,
                username: addOn.username
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();
          }else if(service.type == "Comment Likes"){
            response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'add',
                service: order.apiServiceId,
                link: order.link,
                quantity: order.quantity,
                username: addOn.username
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();
          }else if(service.type == "Poll"){
            response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'add',
                service: order.apiServiceId,
                link: order.link,
                quantity: order.quantity,
                answer_number: addOn.answer_number
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();
          }else if(service.type == "Subscriptions"){
            response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'add',
                service: order.apiServiceId,
                username: addOn.username,
                min: addOn.min,
                max: addOn.max,
                posts: addOn.posts,
                delay: addOn.delay,
                expiry: addOn.expiry,
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();
          }
        
  

          const responseData = response.data;
          if (responseData.error) {
            console.error(`Error: ${responseData.error}`);
            if (
              new String(responseData.error).includes(
                'Not enough funds on balance',
              ) ||
              new String(responseData.error).includes(
                'neworder.error.not_enough_funds',
              )
            ) {
              continue;
            }
            order.remark = responseData.error;
            order.orderPlacedToApi = 1;
            order.status = ORDER_REFUNDED;
            await this.orderRepo.save(order);
            await this.Refunded(order.userId, order.price);
            continue;
          }

          order.status = ORDER_PROCESSING;
          order.orderPlacedToApi = 1;
          order.apiOrderId = responseData.order;
          await this.orderRepo.save(order);
        } catch (error) {
          // console.log(error)
        }
      }
    } catch (error) { }
  }
  @Cron(CronExpression.EVERY_10_SECONDS)
  async serviceUpdate(): Promise<void> {
    try {
      this.logger.log(
        JSON.stringify({
          message: 'Run serviceUpdate',
          data: { date: new Date() },
        }),
      );
      const orders = await this.orderRepo.find({
        where: {
          status: ORDER_PROCESSING,
          apiProviderId: Not(0),
          orderPlacedToApi: 1,
          remark: IsNull(),
        },
      });

      const general = await this.generalSettingRepo.findOne({
        where: { id: 1 },
      });
      general.lastCron = new Date();
      await this.generalSettingRepo.save(general);

      for (const order of orders) {
        try {
          let provider = await this.apiProviderRepo.findOne({
            where: { id: order.apiProviderId },
          });

          const response = await this.httpService
            .post(
              provider.apiUrl,
              {
                key: provider.apiKey,
                action: 'status',
                order: order.apiOrderId,
              },
              {
                httpsAgent: this.proxy.getHttpsAgent(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .toPromise();

          if (response.data.error) {
            //console.log({ error: response.data.error });
            return;
          }

          if (response.data.start_count) {
            order.startCounter = response.data.start_count;
          }
          order.remain = response.data.remains;
          console.log(response.data.status);

          switch (response.data.status) {
            case 'Completed':
              order.status = ORDER_COMPLETED;
              break;
            case 'Cancelled':
              order.status = ORDER_REFUNDED;
              await this.Refunded(order.userId, order.price);
              break;
            case 'Canceled':
              order.status = ORDER_REFUNDED;
              await this.Refunded(order.userId, order.price);
              break;
            case 'Partial':
              order.status = ORDER_REFUNDED;
              await this.Refunded(order.userId, order.price);
              break;
            case 'Refunded':
              order.status = ORDER_REFUNDED;
              await this.Refunded(order.userId, order.price);
              break;
          }

          await this.orderRepo.save(order);
        } catch (error) {
          //console.log(error)
        }
      }
    } catch (error) {
      //console.error(error);
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateBalanceProvider() {
    const providers = await this.apiProviderRepo.find({
      where: { status: true },
    });
    for (const provider of providers) {
      try {
        const response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'balance',
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();

        if (response.data.error) {
          console.log({ error: response.data.error });
          continue;
        }
        await this.apiProviderRepo.update(provider.id, {
          currency: response.data.currency,
          balance: Number(
            new String(response.data.balance).replace(',', '').trim(),
          ),
        });

        if (response.data.currency == 'THB') {
          await this.apiProviderRepo.update(provider.id, {
            rate: 1,
          });
        }
      } catch (err) {
        //console.error(error);
      }
    }
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
  async Refunded(id: number, money: number) {
    this.logger.log(
      JSON.stringify({
        message: 'Run Refunded',
        data: { date: new Date() },
      }),
    );
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      let before = user.balance;
      const now = dayjsTz();

      await queryRunner.manager.increment(
        Users,
        { id: user.id },
        'balance',
        money,
      );

      const tran = new Transactions();
      tran.userId = user.id;
      tran.amount = money;
      tran.postBalance = before;
      tran.charge = 0;
      tran.trxType = '+';
      tran.details = `Refunded amount ${money}`;
      tran.trx = this.generateTrx();
      tran.remark = 'refund';
      tran.createdAt = now.toDate();
      tran.updatedAt = now.toDate();
      await queryRunner.manager.save(tran);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateServiceCost() {
    const providers = await this.apiProviderRepo.find();

    providers.forEach(async (provider) => {
      try {
        const response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'services',
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();

        if (response.data.error) {
          console.log({ error: response.data.error });
          return;
        }

        let services = response.data;
        services.forEach(async (service) => {
          const serviceDb = await this.serviceRepository.findOne({
            where: {
              apiServiceId: service.service,
              apiProviderId: provider.id,
              status: 1,
            },
          });
          if (serviceDb) {
            await this.serviceRepository.update(serviceDb.id, {
              cost: service.rate,
              dripFeed: service.dripFeed,
              type: service.type,
              cancel: service.cancel,
              refill: service.refill,
              min: service.min,
              max: service.max,
            });
          }
        });
      } catch (error) {
        //console.error(error);
      }
    });
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async updateServiceAvailable() {
    const providers = await this.apiProviderRepo.find({
      where: { status: true },
    });
    for (const provider of providers) {
      try {
        const response = await this.httpService
          .post(
            provider.apiUrl,
            {
              key: provider.apiKey,
              action: 'services',
            },
            {
              httpsAgent: this.proxy.getHttpsAgent(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .toPromise();

        if (response.data.error) {
          //console.log({ error: response.data.error });
          continue;
        }
        let servicesProvider = response.data;
        let available = [];

        for (const service of servicesProvider) {
          available.push(service.service);
        }

        const servicesDb = await this.serviceRepository.find({
          where: { status: 1, apiProviderId: provider.id },
        });

        for (const service of servicesDb) {
          if (!available.includes(service.apiServiceId.toString())) {
            await this.serviceRepository.update(service.id, { status: 0 });
          }
        }
      } catch (error) {
        //console.error(error);
      }
    }
  }
}
