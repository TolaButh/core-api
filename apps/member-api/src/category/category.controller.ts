import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiPaginationQuery,
  PaginationOptions,
} from '@app/common/decorator/pagination.decorator';
import { Platform } from '@app/common/entities/Platform';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { ApiPaginationResponse, IPagination, IPaginationOptions } from '@app/common/database/pagination';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('CATEGORY')

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Get('/category')
  @ApiPaginationQuery()
  @ApiPaginationResponse(Platform)
  @ApiCommonErrorResponse()
  async paginationCategory(
    @PaginationOptions() options: IPaginationOptions,
  ): Promise<IPagination<Platform>> {
    return this.categoryService.paginationCategory(options);
  }

  
}
