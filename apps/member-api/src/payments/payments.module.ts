import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { GbprimpayModule } from './gbprimpay/gbprimpay.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';
import { Deposits } from '@app/common/entities/Deposits';
import { Transactions } from '@app/common/entities/Transactions';
import { Users } from '@app/common/entities/Users';
import { AdminNotifications } from '@app/common/entities/AdminNotifications';
import { GbprimpayService } from './gbprimpay/gbprimpay.service';
import { NotificationService } from '../notification/notification.service';
import { HttpModule } from '@nestjs/axios';
import { BonusService } from '../bonus/bonus.service';
import { Bonuses } from '@app/common/entities/Bonuses';
import { PerfectMoneyModule } from './perfect-money/perfect-money.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, GbprimpayService, NotificationService, BonusService],
  imports: [GbprimpayModule,HttpModule, TypeOrmModule.forFeature([Deposits, Transactions, Users, AdminNotifications, Bonuses]), PerfectMoneyModule],
//  exports:[PaymentsService]
})
export class PaymentsModule { }
