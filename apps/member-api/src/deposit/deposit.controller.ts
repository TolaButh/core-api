import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { DepositService } from './deposit.service';
import { Users } from '@app/common/entities/Users';
import {
  ApiPaginationResponse,
  IPagination,
  IPaginationOptions,
} from '@app/common/database/pagination';
import { User } from '@app/common/decorator/user.decorator';
import {
  ApiPaginationQuery,
  PaginationOptions,
} from '@app/common/decorator/pagination.decorator';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Deposits } from '@app/common/entities/Deposits';

@Controller('deposit')
@ApiTags('DEPOSIT')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(Deposits)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,
    @User() user: Users,
  ): Promise<IPagination<Deposits>> {
    return this.depositService.pagination(options, user);
  }
}
