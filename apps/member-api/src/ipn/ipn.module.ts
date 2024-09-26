import { Module } from '@nestjs/common';
import { IpnService } from './ipn.service';
import { IpnController } from './ipn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposits } from '@app/common/entities/Deposits';
import { PaymentsService } from '../payments/payments.service';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';
import { Users } from '@app/common/entities/Users';
import { Transactions } from '@app/common/entities/Transactions';
import { AdminNotifications } from '@app/common/entities/AdminNotifications';
import { Gateways } from '@app/common/entities/Gateways';
import { NotificationService } from '../notification/notification.service';
import { GbprimpayService } from '../payments/gbprimpay/gbprimpay.service';
import { BonusService } from '../bonus/bonus.service';
import { HttpModule } from '@nestjs/axios';
import { Bonuses } from '@app/common/entities/Bonuses';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Deposits, GatewayCurrencies, Users, Transactions, AdminNotifications, Gateways, Bonuses])],
  controllers: [IpnController],
  providers: [IpnService, PaymentsService, NotificationService, GbprimpayService, BonusService]
})
export class IpnModule { }
