import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { Deposits } from '@app/common/entities/Deposits';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Deposits])],
  controllers: [DepositController],
  providers: [DepositService]
})
export class DepositModule {}
