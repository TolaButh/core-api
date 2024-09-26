import { Module } from '@nestjs/common';
import { MemberApiController } from './member-api.controller';
import { MemberApiService } from './member-api.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServicesModule } from './services/services.module';
import { OrderModule } from './order/order.module';
import { PaymentsModule } from './payments/payments.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { ConfigModule} from '@nestjs/config';
import { RegisterModule } from './register/register.module';
import { PlatformModule } from './platform/platform.module';
import { DepositModule } from './deposit/deposit.module';
import { NotificationModule } from './notification/notification.module';
import { RankingModule } from './ranking/ranking.module';
import { CouponModule } from './coupon/coupon.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { NewsModule } from './news/news.module';
import { TransferLocksModule } from './transfer-logs/transfer-logs.module';
import { join } from 'path';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import { BonusModule } from './bonus/bonus.module';
import { TranslatorModule } from './translator/translator.module';
import { IpnModule } from './ipn/ipn.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),


    AuthModule,
    UserModule,
    ServicesModule,
    OrderModule,
    PaymentsModule,
    TransactionsModule,
    DashboardModule,
    RegisterModule,
    PlatformModule,
    DepositModule,
    NotificationModule,
    RankingModule,
    CouponModule,
    AffiliateModule,
    NewsModule,
    TransferLocksModule,
    BonusModule,
    TranslatorModule,
    IpnModule,
    CategoryModule,
  ],
  controllers: [MemberApiController],
  providers: [MemberApiService],
})
export class MemberApiModule {}
