import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@app/common/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Affiliates } from '@app/common/entities/Affiliates';


@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Users)
    private readonly registerService: Repository<Users>,
    @InjectRepository(Affiliates)
    private readonly affiliatesService: Repository<Affiliates>,
  ) {}

  async register(body: CreateRegisterDto) {
    const {password, ref_id,email} = body;
    body.password = await bcrypt.hash(password, 10);
    const newBody = {
      ...body,
      ev: true,
      sv: true,
    };
    await this.registerService.save(newBody);
    const user = await this.registerService.findOneBy({email})
    if(ref_id != null){
        await this.affiliatesService.save({parentId:ref_id,child_id: user.id});
    }
    return user;
  }


}
