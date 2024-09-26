import { Injectable } from '@nestjs/common';
import { CreateGbprimpayDto } from './dto/create-gbprimpay.dto';
import { UpdateGbprimpayDto } from './dto/update-gbprimpay.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposits } from '@app/common/entities/Deposits';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { PaymentsService } from '../payments.service';
import { Gateways } from '@app/common/entities/Gateways';

@Injectable()
export class GbprimpayService {
  constructor(
    @InjectRepository(Deposits)
    private readonly depositRepository: Repository<Deposits>,
    @InjectRepository(Gateways)
    private readonly gatewayRepository: Repository<Gateways>,
    private readonly httpService: HttpService,
    //private readonly paymentsService: PaymentsService
  ) { }

  async procress(deposit: Deposits) {

    const gateway = await this.gatewayRepository.findOne({ where: { code: deposit.methodCode } })
    const gatewayParameter = JSON.parse(deposit.gatewayCurrency.gatewayParameter);

    const amount = Math.round(deposit.finalAmo * 100) / 100;  // This simulates the round() method in PHP for 2 decimal places
    const alias = gateway.alias;

    const url = "https://api.gbprimepay.com/v3/qrcode";

    const response = await this.httpService.post(url, {
      token: gatewayParameter.token,
      referenceNo: Date.now().toString(),
      amount: amount,
      backgroundUrl: `${process.env.URL}/api/ipn/${alias}`,  // Adjust your route accordingly
      merchantDefined1: deposit.userId,
      merchantDefined2: gatewayParameter.api_key,
      merchantDefined3: deposit.trx,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'arraybuffer'
    }).pipe(map(response => response)).toPromise();


   // const qrcode = response.data.qrcode;

    const encodedImage =
      'data:' +
      response.headers['content-type'] +
      ';base64,' +
      Buffer.from(response.data).toString('base64');

    return {
      data: {
        encodedImage: encodedImage,
      }
    };
  }

  async ipn(dto: CreateGbprimpayDto) {
    const deposit = await this.depositRepository
      .createQueryBuilder('deposit')
      .where('deposit.trx = :trx', { trx: dto.merchantDefined3 })
      .orderBy('deposit.id', 'DESC')
      .getOne();

    const gatewayParameter = JSON.parse(deposit.gatewayCurrency.gatewayParameter);

    if (dto.merchantDefined2 !== gatewayParameter.api_key) {
      return "KEY ERROR";
    }

    //  await this.paymentsService.userDataUpdate(deposit);
    return "OK";
  }
}
