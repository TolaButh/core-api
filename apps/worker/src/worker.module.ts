import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { HttpModule } from '@nestjs/axios';
import ormConfig from './config/orm.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '@app/common/entities/Orders';
import { GeneralSettings } from '@app/common/entities/GeneralSettings';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiProviders } from '@app/common/entities/ApiProviders';
import { Services } from '@app/common/entities/Services';
import { ProxyServerService } from '@app/common/proxy-server/proxy-server.service';
import { Users } from '@app/common/entities/Users';
import { Transactions } from '@app/common/entities/Transactions';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { WORKER } from '@app/common/constants/modules';

@Module({
  imports: [
    HttpModule,
    RmqModule.register({
      name: process.env.SITE_NAME + WORKER,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Orders,GeneralSettings,ApiProviders, Services,Users,Transactions])
  ],
  controllers: [WorkerController],
  providers: [WorkerService,ProxyServerService],
})
export class WorkerModule {}
