import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransferLogsService } from './transfer-logs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiPaginationQuery,
  PaginationOptions,
} from '@app/common/decorator/pagination.decorator';
import {
  ApiPaginationResponse,
  IPagination,
  IPaginationOptions,
} from '@app/common/database/pagination';
import { TransferLogs } from '@app/common/entities/TransferLogs';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { User } from '@app/common/decorator/user.decorator';
import { Users } from '@app/common/entities/Users';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '@app/common/dto/user.dto';

@Controller('transfer-logs')
@ApiTags('TRANSFERLOGS')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class TransferLogsController {
  constructor(private readonly transferService: TransferLogsService) {}

  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(TransferLogs)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,
    @User() user: Users,
  ): Promise<IPagination<TransferLogs>> {
    return this.transferService.pagination(options, user);
  }

  @Post()
  @ApiCommonErrorResponse()
  @HttpCode(200)
  async transferMoney(
    @User() user: UserDto,
  ): Promise<{ isSuccess: Boolean; message: string }> {
    const id = user.id;
    return await this.transferService.transferMoney(id);
  }
}
