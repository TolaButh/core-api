import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '@app/common/entities/Orders';
import { Users } from '@app/common/entities/Users';
import { Transactions } from '@app/common/entities/Transactions';
import { AdminNotifications } from '@app/common/entities/AdminNotifications';
import { Services } from '@app/common/entities/Services';
import { ApiProviders } from '@app/common/entities/ApiProviders';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { WORKER } from '@app/common/constants/modules';

@Module({
  imports:[TypeOrmModule.forFeature([Orders,Users,Transactions,AdminNotifications,Services, ApiProviders]),
  RmqModule.register({
    name: process.env.SITE_NAME + "_" + WORKER,
  })],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
