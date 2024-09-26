import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '@app/common/entities/News';
import { Repository } from 'typeorm';
import {
  IPagination,
  IPaginationOptions,
  paginate,
} from '@app/common/database/pagination';
import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';
import { NEWS_OPEN } from '@app/common/constants/status';

@Injectable()
export class NewsService {
constructor(
  @InjectRepository(News)
  private readonly newsRepository: Repository<News>,
){}
  
  async pagination(
    options: IPaginationOptions,
  ): Promise<IPagination<News>> {
    try {
      const query = { where: { status: NEWS_OPEN }, order:{id: 'DESC'}};
      return await paginate<News>(this.newsRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }

}
