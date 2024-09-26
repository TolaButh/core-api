import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transactions } from '@app/common/entities/Transactions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPagination,
  IPaginationOptions,
  paginate,
} from '@app/common/database/pagination';
import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';
import { Users } from '@app/common/entities/Users';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
  ) { }

  findOne(id: number) {
    return this.transactionsRepository.findOneBy({ id });
  }

  async pagination(
    options: IPaginationOptions,
    user: Users,
  ): Promise<IPagination<Transactions>> {
    try {
      const query = { where: { userId: user.id }, order: { id: 'DESC' } };
      return await paginate<Transactions>(this.transactionsRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }
}
