import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupons } from '@app/common/entities/Coupons';
import { Users } from '@app/common/entities/Users';
import { UserHashCoupons } from '@app/common/entities/UserHashCoupons';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupons,Users,UserHashCoupons],)
  ],
  controllers: [CouponController],
  providers: [CouponService]
})
export class CouponModule {}
