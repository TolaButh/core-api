import { Services } from '@app/common/entities/Services';
import { TransferLogs } from '@app/common/entities/TransferLogs';
import { Users } from '@app/common/entities/Users';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPagination,
  IPaginationOptions,
  paginate,
} from '@app/common/database/pagination';
import { DataSource, Repository } from 'typeorm';
import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';
import { dayjsTz } from '@app/common/utils/dayjs';
import {
  TRANSFER_COMPLETED,
  TRANSFER_PENDING,
} from '@app/common/constants/status';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TransferLogsService {
  constructor(
    @InjectRepository(TransferLogs)
    private readonly transferRepository: Repository<TransferLogs>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly dataSource: DataSource,
    private readonly i18nService: I18nService,
  ) {}

  async pagination(
    options: IPaginationOptions,
    user: Users,
  ): Promise<IPagination<TransferLogs>> {
    try {
      const query = { where: { userId: user.id }, order: { id: 'DESC' } };
      return await paginate<TransferLogs>(
        this.transferRepository,
        options,
        query,
      );
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }

  async transferMoney(id: number): Promise<{
    isSuccess: Boolean;
    message: string;
  }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const now = dayjsTz();
    const user = await this.userRepository.findOne({ where: { id: id } });

    try {
      if (user.income < 25) {
        throw new BadRequestException('Income should be more than 25 baht');
      }

      await queryRunner.manager.increment(
        Users,
        { id: user.id },
        'balance',
        +user.income,
      );
      await queryRunner.manager.decrement(
        Users,
        { id: user.id },
        'income',
        +user.income,
      );

      const transferLogs = new TransferLogs();
      transferLogs.userId = user.id;
      transferLogs.amount = user.income;
      transferLogs.details = '-';
      transferLogs.status = TRANSFER_COMPLETED;
      transferLogs.createdAt = now.toDate();
      transferLogs.updatedAt = now.toDate();
      await queryRunner.manager.save(transferLogs);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return {
      isSuccess: true,
      message: this.i18nService.t('test.TRANSFER_CREDIT', {
        lang: user.countryCode.toLocaleLowerCase(),
      }),
    };
  }
}
