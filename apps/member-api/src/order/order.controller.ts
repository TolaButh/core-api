import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiPaginationResponse,
  IPaginationOptions,
  IPagination,
} from '@app/common/database/pagination';
import { User } from '@app/common/decorator/user.decorator';
import { Users } from '@app/common/entities/Users';
import {
  ApiPaginationQuery,
  PaginationOptions,
} from '@app/common/decorator/pagination.decorator';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { Orders } from '@app/common/entities/Orders';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '@app/common/dto/user.dto';

@Controller('order')
@ApiTags('ORDER')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(Orders)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,
    @User() user: Users,
  ): Promise<IPagination<Orders>> {
    return this.orderService.pagination(options, user);
  }

  @Get(':status/status')
  @ApiPaginationQuery()
  @ApiPaginationResponse(Orders)
  @ApiCommonErrorResponse()
  async paginationStatus(
    @PaginationOptions() options: IPaginationOptions,
    @User() user: Users,
    @Param('status') status: number,
  ): Promise<IPagination<Orders>> {
    return this.orderService.paginationStatus(options, user, status);
  }

  @Post()
  create(
    @Body() createPaymentDto: CreateOrderDto,
    @User() user: UserDto,
  ): Promise<{ isSuccess: Boolean; message: string; redirectTo?: string }> {
    return this.orderService.orderTransaction(createPaymentDto, user);
  }
}
