import { Module } from '@nestjs/common';
import { PerfectMoneyService } from './perfect-money.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gateways } from '@app/common/entities/Gateways';

@Module({
  imports: [TypeOrmModule.forFeature([Gateways])],
  providers: [PerfectMoneyService],
  exports: [PerfectMoneyService],
})
export class PerfectMoneyModule {}
