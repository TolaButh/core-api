import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository, Transaction } from 'typeorm';

import {
  IPagination,
  IPaginationOptions,
  paginate,
} from '@app/common/database/pagination';
import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';
import { Bonuses } from '@app/common/entities/Bonuses';

import { CreateBonusDto } from './dto/create.bonus.dto';
import { UpdateBonusDto } from './dto/update.bonus.dto';
import { Users } from '@app/common/entities/Users';
import { Transactions } from '@app/common/entities/Transactions';
import { dayjsTz } from '@app/common/utils/dayjs';

@Injectable()
export class BonusService {
  constructor(
    @InjectRepository(Bonuses)
    private readonly bonusRepository: Repository<Bonuses>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateBonusDto): Promise<Bonuses> {
    const bonus_exist = await this.bonusRepository.findOne({
      where: { amount: dto.amount },
    });
    if (bonus_exist) {
      throw new BadRequestException('This amount of bonus is already recorded');
    }
    return await this.bonusRepository.save(dto);
  }

  async update(id: number, dto: UpdateBonusDto) {
    const bonus = await this.bonusRepository.findOne({ where: { id: id } });
    if (!bonus) {
      throw new BadRequestException('Not found');
    }
    return await this.bonusRepository.update(id, dto);
  }

  async remove(id: number) {
    const bonus = await this.bonusRepository.findOne({ where: { id: id } });
    if (!bonus) {
      throw new BadRequestException('Not found');
    }
    return await this.bonusRepository.delete(id);
  }

  async pagination(options: IPaginationOptions): Promise<IPagination<Bonuses>> {
    try {
      const query = { where: {} };
      return await paginate<Bonuses>(this.bonusRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }


  async recievceBonus(id: number, money: number, r: QueryRunner) {

    const user  = await this.usersRepository.findOne({where:{id: id}});
    const now = dayjsTz()
    const result = await this.getBonus(money);
    const value_bonus = (Number(money)*result)/100

    let before  = user.balance

    await r.manager.increment(Users, {id: user.id},'balance', value_bonus);
    
    const tran = new Transactions()
    tran.userId = user.id
    tran.amount = value_bonus
    tran.postBalance = before
    tran.charge = 0
    tran.trxType = '+'
    tran.details = `Amount of bonus ${value_bonus}`
    tran.trx = this.generateTrx()
    tran.remark = 'deposit'
    tran.createdAt = now.toDate()
    tran.updatedAt = now.toDate()
    await r.manager.save(tran)
   
  }

  async getBonus(amount: number): Promise<number> {
    const bonus = await this.bonusRepository
      .createQueryBuilder('bonus')
      .where('bonus.amount <= :amount', { amount })
      .orderBy('bonus.amount', 'DESC')
      .getOne();

    return bonus ? bonus.percent : 0;
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
