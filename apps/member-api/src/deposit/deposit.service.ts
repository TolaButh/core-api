import { Injectable } from '@nestjs/common';
import { Deposits } from '@app/common/entities/Deposits';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPagination,
  IPaginationOptions,
  paginate,
} from '@app/common/database/pagination';
import { Users } from '@app/common/entities/Users';
import { Services } from '@app/common/entities/Services';
import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposits)
    private depositsRepository: Repository<Deposits>,
  ) {}

  async pagination(
    options: IPaginationOptions,
    user: Users,
  ): Promise<IPagination<Deposits>> {
    try {
      const query = { where: { userId: user.id }, order: { id: 'DESC' } };
      return await paginate<Deposits>(this.depositsRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }
}
