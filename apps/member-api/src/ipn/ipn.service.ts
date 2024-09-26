import { Deposits } from '@app/common/entities/Deposits';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentsService } from '../payments/payments.service';
import * as crypto from 'crypto';
import { round } from 'lodash';
import { PAYMENT_INITIATE } from '@app/common/constants/status';

@Injectable()
export class IpnService {
  constructor(
    @InjectRepository(Deposits)
    private readonly depositRepository: Repository<Deposits>,
    private readonly paymentsService: PaymentsService
  ){}
  async create(alias: string, createIpnDto: any) {
    switch (alias) {
      case "GBPrimePay":
        await this.ipnGBPrimePay(createIpnDto)
        break;

      default:
        break;
    }
    return 'This action adds a new ipn';
  }
 async ipnGBPrimePay(createIpnDto: any) {
    const deposit = await this.depositRepository
      .createQueryBuilder('deposit')
      .leftJoinAndSelect('deposit.gatewayCurrency', 'gatewayCurrency') // ทำการ join relation gatewayCurrency
      .where('deposit.trx = :trx', { trx: createIpnDto.merchantDefined3 })
      .orderBy('deposit.id', 'DESC')
      .getOne();

    const gatewayParameter = JSON.parse(deposit.gatewayCurrency.gatewayParameter);

    if (createIpnDto.merchantDefined2 !== gatewayParameter.api_key) {
      return "KEY ERROR";
    }

    await this.paymentsService.userDataUpdate(deposit);
    return "OK";
  }

  async ipnPerfectMoney(createIpnPerfectMoney: any){
    const deposit = await this.depositRepository
      .createQueryBuilder('deposit')
      .leftJoinAndSelect('deposit.gatewayCurrency', 'gatewayCurrency') // ทำการ join relation gatewayCurrency
      .where('deposit.trx = :trx', { trx: createIpnPerfectMoney.merchantDefined3 })
      .orderBy('deposit.id', 'DESC')
      .getOne();

    const pmAcc = JSON.parse(deposit.gatewayCurrency.gatewayParameter);
    const passphras = pmAcc.passphrase;
    const passphrase = crypto.createHash('md5').update(passphras.toUpperCase()).digest('hex');
    const hash  = createIpnPerfectMoney.PAYMENT_ID + ":" + createIpnPerfectMoney.createIpnPerfectMoney + ":" +
    createIpnPerfectMoney.PAYMENT_AMOUNT + ":" + createIpnPerfectMoney.PAYMENT_UNITS + ":" + 
    createIpnPerfectMoney.PAYMENT_BATCH_NUM + ":" + createIpnPerfectMoney.PAYER_ACCOUNT + ":" + 
    passphrase + ":" + createIpnPerfectMoney.TIMESTAMPGMT;
    const hash2 = createIpnPerfectMoney.V2_HASH;
    if (hash == hash2) {
    await this.depositRepository.update(deposit.id,createIpnPerfectMoney );
    }
            
    const amo = createIpnPerfectMoney.PAYMENT_AMOUNT
    const unit = createIpnPerfectMoney.PAYMENT_UNITS;
            if (createIpnPerfectMoney.PAYEE_ACCOUNT == pmAcc.wallet_id && unit == deposit.methodCurrency && amo == round(deposit.finalAmo, 2) && deposit.status == PAYMENT_INITIATE) {
              await this.paymentsService.userDataUpdate(deposit);
            }

    return "OK";
  }
}
