import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bonuses } from '@app/common/entities/Bonuses';

import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';
import { Users } from '@app/common/entities/Users';
import { Transactions } from '@app/common/entities/Transactions';


@Module({
  imports: [TypeOrmModule.forFeature([Bonuses,Users,Transactions])],
  providers: [BonusService],
  controllers: [BonusController],
})
export class BonusModule {}
