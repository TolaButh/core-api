import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { ApiPaginationQuery, PaginationOptions } from '@app/common/decorator/pagination.decorator';
import { ApiPaginationResponse, IPagination, IPaginationOptions } from '@app/common/database/pagination';
import { User } from '@app/common/decorator/user.decorator';
import { Users } from '@app/common/entities/Users';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { Platform } from '@app/common/entities/Platform';
import { ApiTags } from '@nestjs/swagger';

@Controller('platform')
@ApiTags('PLATFORM')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(Platform)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,
    @User() user: Users,
  ): Promise<IPagination<Platform>> {
    return this.platformService.pagination(options, user);
  }

  @Get(":platformId/category")
  @ApiPaginationQuery()
  @ApiPaginationResponse(Platform)
  @ApiCommonErrorResponse()
  async paginationCategory(
    @PaginationOptions() options: IPaginationOptions,
    @User() user: Users,
    @Param("platformId") platformId: number,
  ): Promise<IPagination<Platform>> {
    return this.platformService.paginationCategory(options, user,platformId);
  }




}
