import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';
import { IPagination, IPaginationOptions, paginate } from '@app/common/database/pagination';
import { Platform } from '@app/common/entities/Platform';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
  ) {}
  async paginationCategory(
    options: IPaginationOptions,

    
  ): Promise<IPagination<Platform>> {
    try {
      const query = { where: { status: 1 } };
      return await paginate<Platform>(this.platformRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }
}
