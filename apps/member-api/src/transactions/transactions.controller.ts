import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginationQuery, PaginationOptions } from '@app/common/decorator/pagination.decorator';
import { ApiPaginationResponse, IPagination, IPaginationOptions } from '@app/common/database/pagination';
import { Transactions } from '@app/common/entities/Transactions';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { User } from '@app/common/decorator/user.decorator';
import { Users } from '@app/common/entities/Users';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@ApiTags('TRANSACTION')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}


  @Get(':id')
  @ApiOperation({description: 'Get transaction by Id'})
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  
  @ApiOperation({description:"Get all transsaction"})
  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(Transactions)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,
    @User() user: Users,
  ): Promise<IPagination<Transactions>> {
    return this.transactionsService.pagination(options, user);
  }

}
