import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupons } from '@app/common/entities/Coupons';
import { DataSource, Repository } from 'typeorm';
import { dayjsTz } from '@app/common/utils/dayjs';
import { Users } from '@app/common/entities/Users';
import { UserHashCoupons } from '@app/common/entities/UserHashCoupons';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupons)
    private readonly couponRepository: Repository<Coupons>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserHashCoupons)
    private readonly userHashRepo: Repository<UserHashCoupons>,
    private readonly dataSource: DataSource,
    private readonly i18nService: I18nService,
  ) {}

  async createCoupon(dto: CreateCouponDto) {
    const now = dayjsTz();
    const codeCoupon = this.generateCouponCode();
    dto.code = codeCoupon;
    dto.createdAt = now.toDate();
    dto.updatedAt = now.toDate();
    return await this.couponRepository.save(dto);
  }

  async updateCoupon(id: number, dto: UpdateCouponDto) {
    return await this.couponRepository.update(id, dto);
  }

  async applyCoupon(id: number, couponCode: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    const coupon = await this.couponRepository.findOne({
      where: { code: couponCode },
    });
    const userHashCoupon = await this.userHashRepo.findOne({
      where: { userId: user.id },
    });
    console.log({ userHashCoupon });

    if (!coupon) {
      throw new NotFoundException('Coupon not found!');
    }

    if (userHashCoupon) {
      throw new NotFoundException('The user is apply coupon already!');
    }

    if (coupon.remaining <= 0) {
      throw new NotFoundException('The number of coupons has run out.');
    }
    if (!coupon.status) {
      throw new NotFoundException('Coupon can not used');
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const now = dayjsTz();
      await queryRunner.manager.decrement(
        Coupons,
        { id: coupon.id },
        'remaining',
        1,
      );

      const useHashCoupon = new UserHashCoupons();
      useHashCoupon.userId = user.id;
      useHashCoupon.couponId = coupon.id;
      useHashCoupon.createdAt = now.toDate();
      useHashCoupon.updatedAt = now.toDate();
      await queryRunner.manager.save(useHashCoupon);

      await queryRunner.manager.increment(
        Users,
        { id: user.id },
        'balance',
        coupon.amount,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }

    return {
      isSuccess: true,
      message: this.i18nService.t('test.RECIEVCE_SUCCESS', {
        lang: user.countryCode.toLocaleLowerCase(),
      }),
    };
  }

  private generateCouponCode() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let couponCode = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      couponCode += charset[randomIndex];
    }

    return couponCode;
  }
}
