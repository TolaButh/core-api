import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '@app/common/decorator/user.decorator';
import { UserDto } from '@app/common/dto/user.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupon')
@ApiTags('COUPONS')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.createCoupon(createCouponDto);
  }

  @Post(':couponCode')
  async applyCoupon(@User() user: UserDto, @Param('couponCode') couponCode: string) {
    const id = user.id
    return await this.couponService.applyCoupon(id, couponCode)
  }

  @Patch(':id')
  async updateCoupon(@Param('id') id: number, @Body() body: UpdateCouponDto) {
    return await this.couponService.updateCoupon(id, body)
  }
}
