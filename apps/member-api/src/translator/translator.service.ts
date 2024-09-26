import { Users } from '@app/common/entities/Users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {Repository} from 'typeorm';

@Injectable()
export class TranslatorService {
    constructor(
      @InjectRepository(Users)
      private readonly userRepository: Repository<Users>,
      private readonly i18n: I18nService
      ) {}

    async getHello(id: number):Promise<string> {
      const user = await this.userRepository.findOne({where:{id: id}})
      const countryCode = user.countryCode
        return this.i18n.t('test.USE_DATA_UPDATE',{ lang: countryCode.toLowerCase() });
      }
}
