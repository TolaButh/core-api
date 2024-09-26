import { Deposits } from '@app/common/entities/Deposits';
import { Gateways } from '@app/common/entities/Gateways';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { round } from 'lodash';
import { map } from 'rxjs';
@Injectable()
export class PerfectMoneyService {
    constructor(
    // @InjectRepository(Deposits)
    // private readonly depositRepository: Repository<Deposits>,
    @InjectRepository(Gateways)
    private readonly gatewayRepository: Repository<Gateways>,
    // private readonly httpService: HttpService,
    ){}


    // $val['PAYEE_ACCOUNT'] = trim($perfectAcc->wallet_id);
    // $val['PAYEE_NAME'] = $basic->site_name;
    // $val['PAYMENT_ID'] = "$deposit->trx";
    // $val['PAYMENT_AMOUNT'] = round($deposit->final_amo, 2);
    // $val['PAYMENT_UNITS'] = "$deposit->method_currency";

    // $val['STATUS_URL'] = route('ipn.' . $deposit->gateway->alias);
    // $val['PAYMENT_URL'] = route(gatewayRedirectUrl(true));
    // $val['PAYMENT_URL_METHOD'] = 'POST';
    // $val['NOPAYMENT_URL'] = route(gatewayRedirectUrl());
    // $val['NOPAYMENT_URL_METHOD'] = 'POST';
    // $val['SUGGESTED_MEMO'] = auth()->user()->username;
    // $val['BAGGAGE_FIELDS'] = 'IDENT';

    async procress(deposit:Deposits) {

    const url = "https://perfectmoney.is/api/step1.asp";
    const gateway = await this.gatewayRepository.findOne({ where: { code: deposit.methodCode } })
    const alias = gateway.alias;
    const gatewayParameter = JSON.parse(deposit.gatewayCurrency.gatewayParameter);

    const data = {
        PAYEE_ACCOUNT:gatewayParameter.wallet_id,
        PAYEE_NAME: gatewayParameter.name,
        PAYMENT_ID: deposit.trx,
        PAYMENT_AMOUNT: round(deposit.finalAmo, 2),
        PAYMENT_UNITS: deposit.methodCurrency,
        STATUS_URL: `${process.env.URL}/api/ipn/${alias}`,
        PAYMENT_URL: process.env.URL,
        NOPAYMENT_URL:process.env.URL,
        NOPAYMENT_URL_METHOD: 'POST',
        SUGGESTED_MEMO: deposit.userId,
        BAGGAGE_FIELDS:'IDENT',
        URL: url,
        METHOD: 'POST'
    };
      
    return data;
    }

    
}
