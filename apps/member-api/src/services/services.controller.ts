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
import { ServicesService } from './services.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiPaginationResponse,
  IPagination,
  IPaginationOptions,
} from '@app/common/database/pagination';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { Users } from '@app/common/entities/Users';
import { User } from '@app/common/decorator/user.decorator';
import { Services } from '@app/common/entities/Services';
import {
  ApiPaginationQuery,
  PaginationOptions,
} from '@app/common/decorator/pagination.decorator';
import { UserDto } from '@app/common/dto/user.dto';

@Controller('services')
@ApiTags('SERVICES')

@ApiBearerAuth()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get(':categoryId/category')
  @ApiPaginationQuery()
  @ApiPaginationResponse(Services)
  @ApiCommonErrorResponse()
  async paginationCategory(
    @PaginationOptions() options: IPaginationOptions,

    @Param('categoryId') categoryId: number,
  ): Promise<IPagination<Services>> {
    return this.servicesService.paginationCategory(options, categoryId);
  }

  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(Services)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,

  ): Promise<IPagination<Services>> {
    return this.servicesService.pagination(options);
  }

  @Get(':id')
  async findServiceById(@Param('id') id: number) {
    return await this.servicesService.findOne(id);
  }
}
