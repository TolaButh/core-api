import { Module } from '@nestjs/common';
import { GbprimpayService } from './gbprimpay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposits } from '@app/common/entities/Deposits';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Gateways } from '@app/common/entities/Gateways';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';


@Module({
  imports:[HttpModule,TypeOrmModule.forFeature([Deposits,Gateways,GatewayCurrencies,Gateways])],
  providers: [GbprimpayService],
  exports:[TypeOrmModule.forFeature([Deposits,Gateways,GatewayCurrencies,Gateways])]
})
export class GbprimpayModule {}
