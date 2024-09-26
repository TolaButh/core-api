import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';
import { IPagination, IPaginationOptions, paginate } from '@app/common/database/pagination';
import { Categories } from '@app/common/entities/Categories';
import { Platform } from '@app/common/entities/Platform';
import { Users } from '@app/common/entities/Users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlatformService {

  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) { }

  async pagination(
    options: IPaginationOptions,
    user: Users,
  ): Promise<IPagination<Platform>> {
    try {
      const query = { where: { } };
      return await paginate<Platform>(this.platformRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }

  async paginationCategory(
    options: IPaginationOptions,
    user: Users,
    platformId: number,
  ): Promise<IPagination<Platform>> {
    try {
      const query = { where: { platformId  } };
      return await paginate<Platform>(this.categoryRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }



}
