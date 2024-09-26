import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { Services } from '@app/common/entities/Services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPagination,
  IPaginationOptions,
  paginate,
} from '@app/common/database/pagination';
import { Users } from '@app/common/entities/Users';
import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
  ) {}

  async paginationCategory(
    options: IPaginationOptions,

    categoryId: number,
  ): Promise<IPagination<Services>> {
    try {
      const query = { where: {categoryId:categoryId, status: 1 } };
      return await paginate<Services>(this.servicesRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }


  async pagination(
    options: IPaginationOptions,

  ): Promise<IPagination<Services>> {
    try {
      const query = { where: { status: 1} };
      return await paginate<Services>(this.servicesRepository, options, query);
    } catch (e) {
      throw new Exception(e, dbError);
    }
  }

  async findOne(id: number){
    return await this.servicesRepository.findOne({ where: { id: id } })
  }
}
