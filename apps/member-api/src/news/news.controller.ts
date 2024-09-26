import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiPaginationResponse, IPagination, IPaginationOptions } from '@app/common/database/pagination';
import { ApiCommonErrorResponse } from '@app/common/decorator/api-common-error-response.decorator';
import { ApiPaginationQuery, PaginationOptions } from '@app/common/decorator/pagination.decorator';
import { News } from '@app/common/entities/News';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('news')
@ApiTags('NEWS')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(News)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,
  ): Promise<IPagination<News>> {
    return this.newsService.pagination(options);
  }
}
