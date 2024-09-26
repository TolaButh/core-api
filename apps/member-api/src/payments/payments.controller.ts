import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@app/common/dto/user.dto';
import { User } from '@app/common/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TrueGiftPaymentDto } from './dto/truegift-payment.dto';

@Controller('payments')
@ApiTags('PAYMENTS')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @User() user: UserDto) {
    return this.paymentsService.makePayment(createPaymentDto, user);
  }

  @Get('/:methodCode')
  findOne(@Param('methodCode') methodCode: number, @User() user: UserDto) {
    return this.paymentsService.findOne(+methodCode, user);
  }

  @Post('/truegift')
  async trueGiftPayment(@Body() body: TrueGiftPaymentDto,@User() user: UserDto) {
    return this.paymentsService.trueGiftPayment(body,user);
  }
}
