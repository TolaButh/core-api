import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ENABLE, PAYMENT_INITIATE, PAYMENT_PENDING, PAYMENT_SUCCESS } from '@app/common/constants/status';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposits } from '@app/common/entities/Deposits';
import { Users } from '@app/common/entities/Users';
import { Transactions } from '@app/common/entities/Transactions';
import { AdminNotifications } from '@app/common/entities/AdminNotifications';
import { NotificationService } from '../notification/notification.service';
import { GbprimpayService } from './gbprimpay/gbprimpay.service';
import { UserDto } from '@app/common/dto/user.dto';
import { Gateways } from '@app/common/entities/Gateways';
import { TrueGiftPaymentDto } from './dto/truegift-payment.dto';
import TrueGiftRedeem from '@app/common/payment/TrueGiftRedeem';
import { dayjsTz } from '@app/common/utils/dayjs';
import { BonusService } from '../bonus/bonus.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(GatewayCurrencies)
    private readonly gatewayCurrencyRepository: Repository<GatewayCurrencies>,
    @InjectRepository(Deposits)
    private readonly depositRepository: Repository<Deposits>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
    @InjectRepository(AdminNotifications)
    private readonly adminNotificationRepository: Repository<AdminNotifications>,
    @InjectRepository(Gateways)
    private readonly gatewayRepository: Repository<Gateways>,
    private readonly notificationService: NotificationService,
    private readonly gbprimpayService: GbprimpayService,
    private readonly bonusService: BonusService,
    private readonly i18n: I18nService,
    private readonly dataSource: DataSource,
  ) { }
  async makePayment(createPaymentDto: CreatePaymentDto, user: UserDto) {
    const now = dayjsTz();
    const gate = await this.gatewayCurrencyRepository.findOne({
      where: {
        method_code: createPaymentDto.method_code,
        currency: createPaymentDto.currency,
      },
    });


    if (!gate) {
      throw new NotFoundException('Invalid gateway');
    }

    if (Number(gate.minAmount) > Number(createPaymentDto.amount) || Number(gate.maxAmount) < Number(createPaymentDto.amount)) {
      throw new BadRequestException('Please follow deposit limit');
    }

    const charge = Number(gate.fixedCharge) + (Number(createPaymentDto.amount) * Number(gate.percentCharge) / 100);
    const payable = Number(createPaymentDto.amount) + Number(charge);
    const final_amo = Number(payable) * Number(gate.rate);

    const deposit = this.depositRepository.create({
      userId: user.id,
      methodCode: gate.method_code,
      methodCurrency: gate.currency.toUpperCase(),
      amount: Number(createPaymentDto.amount),
      charge: charge,
      rate: gate.rate,
      finalAmo: final_amo,
      btcAmo: 0,
      btcWallet: "",
      createdAt: now.toDate(),
      updatedAt: now.toDate(),
      trx: this.generateTrx(),  // You'll have to implement or import this function
    });


    let result = await this.depositRepository.save(deposit);

    try {
      let res = await this.depositRepository.findOneOrFail({ where: { id: result.id }, relations: ["gatewayCurrency"] })
      if (res) {
        return await this.findGateway(res, gate.method_code)
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Not save Deposit');
    }
  }

  generateTrx(length: number = 12): string {
    const characters = 'ABCDEFGHJKMNOPQRSTUVWXYZ123456789';
    const charactersLength = characters.length;
    let randomString = '';

    for (let i = 0; i < length; i++) {
      randomString += characters[Math.floor(Math.random() * charactersLength)];
    }

    return randomString;
  }

  // Sample showAmount function similar to PHP one. Adjust accordingly.
  showAmount(amount: number): string {
    return `$${Number(amount).toFixed(2)}`;
  }
  async userDataUpdate(deposit: Deposits, isManual?: boolean): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const user = await this.userRepository.findOne({ where: { id: deposit.userId } });
    const countryCode = user.countryCode
    const now = dayjsTz()
    try {
      if (
        deposit.status === PAYMENT_INITIATE ||
        deposit.status === PAYMENT_PENDING
      ) {
        deposit.status = PAYMENT_SUCCESS;
        await this.depositRepository.save(deposit);

        let before  = user.balance

        await queryRunner.manager.increment(Users, { id: user.id }, 'balance', deposit.amount);


        const tran = new Transactions()
        tran.userId = deposit.userId
        tran.amount = deposit.amount
        tran.postBalance = before
        tran.charge = deposit.charge
        tran.trxType = '+'
        tran.details = `Deposit Via ${deposit.gatewayCurrency.name}`
        tran.trx = deposit.trx
        tran.remark = 'deposit'
        tran.createdAt = now.toDate()
        tran.updatedAt = now.toDate()
        await queryRunner.manager.save(tran)
  
        await this.bonusService.recievceBonus(user.id, deposit.amount,queryRunner);

        if (!isManual) {
          const adminNot = new AdminNotifications()
          adminNot.userId = user.id
          adminNot.title = `Deposit successful via ${deposit.gatewayCurrency.name}`
          adminNot.clickUrl = 'admin.deposit.successful'
          adminNot.createdAt = now.toDate()
          adminNot.updatedAt = now.toDate()
          await queryRunner.manager.save(adminNot)
        }

        // The 'notify' function is not provided in the PHP code, but you would create a notification service in NestJS.
        this.notificationService.notify(user, isManual ? 'DEPOSIT_APPROVE' : 'DEPOSIT_COMPLETE', {
          // This assumes a showAmount function similar to the PHP one. Adjust accordingly.
          method_name: deposit.gatewayCurrency.name,
          method_currency: deposit.methodCurrency,
          method_amount: this.showAmount(deposit.finalAmo),
          amount: this.showAmount(deposit.amount),
          charge: this.showAmount(deposit.charge),
          rate: this.showAmount(deposit.rate),
          trx: deposit.trx,
          post_balance: this.showAmount(user.balance),
        });


      }
      await queryRunner.commitTransaction()
     
      return {
        isSuccess: true,
        message:  this.i18n.t('test.USE_DATA_UPDATE',{ lang: countryCode.toLowerCase() })
      }
    } catch (err) {

      await queryRunner.rollbackTransaction();
      throw new Error(err);
    }

  }


  async findGateway(deposit: Deposits, methodCode: number) {
    let res
    switch (methodCode) {
      case 78:
        res = await this.gbprimpayService.procress(deposit)
        return res
        break;

      default:
        break;
    }
  }

  async findOne(methodCode: number, user: UserDto) {

    let whilelistCode = [79]
    if (!whilelistCode.includes(methodCode)) {
      throw new NotFoundException('Invalid gateway');
    }
    const gateway = await this.gatewayRepository.findOne({ where: { code: methodCode } });

    if (!gateway) {
      throw new NotFoundException('Invalid gateway');
    }
    let gatewayParameters = gateway.gatewayParameters
    gatewayParameters = JSON.parse(gatewayParameters)

    return {
      data: gatewayParameters,
      isSuccess: true,
    };
  }

  async trueGiftPayment(dto: TrueGiftPaymentDto, user: UserDto) {
    const code = 80;
    const now = dayjsTz();
    const gateway = await this.gatewayRepository.findOne({ where: { code: code } });
    const gate = await this.gatewayCurrencyRepository.findOne({
      where: {
        method_code: code,
      },
    });

    let gatewayParameters: any = gateway.gatewayParameters
    gatewayParameters = JSON.parse(gatewayParameters)
    let own_account = gatewayParameters.tel.value
    try {
      const params = new URLSearchParams(new URL(dto.link).search);
      const hash = params.get('v');
      if (!hash) {
        throw new NotFoundException('Link not found');
      }
      let tw = new TrueGiftRedeem()
      let res = await tw.checkVouchers(hash)
      if (res.status.code == "SUCCESS") {
        if (res.data.voucher.available >= 1) {
          let redReem = await tw.redeem(own_account, hash)
          if (redReem.status.code == "SUCCESS") {
            let amount = redReem.data.my_ticket.amount_baht
            let voucher_id = redReem.data.voucher.voucher_id

            const charge = Number(gate.fixedCharge) + (Number(amount) * Number(gate.percentCharge) / 100);
            const payable = Number(amount) + Number(charge);
            const final_amo = Number(payable) * Number(gate.rate);
            const deposit = this.depositRepository.create({
              userId: user.id,
              methodCode: gate.method_code,
              methodCurrency: gate.currency.toUpperCase(),
              amount: amount,
              charge: charge,
              rate: gate.rate,
              finalAmo: final_amo,
              btcAmo: 0,
              btcWallet: "",
              createdAt: now.toDate(),
              updatedAt: now.toDate(),
              trx: hash  // You'll have to implement or import this function
            });

            let result = await this.depositRepository.save(deposit);

            try {
              let res = await this.depositRepository.findOneOrFail({ where: { id: result.id }, relations: ["gatewayCurrency"] })
              console.log({res})
              if (res) {
                return await this.userDataUpdate(res);
              }
            } catch (error) {
              console.log(error)
              throw new BadRequestException('Not save Deposit');
            }

          }
        } else {
          throw new BadRequestException('Link is wrong')
        }
      } else {
        throw new BadRequestException('Link is wrong')
      }


    } catch (error) {
      console.log({ error })
      throw new BadRequestException('Link is wrong')

    }


  }
}
