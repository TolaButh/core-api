import {
    BadRequestException,
    Inject,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { CreateRegisterDto } from '../dto/create-register.dto';

 
  @Injectable()
  export class RegisterValidationPipes implements PipeTransform {
    @Inject() private readonly usersService: UserService
    async transform(body: CreateRegisterDto): Promise<CreateRegisterDto> {
      const refExits = await this.usersService.findUserByRef(body.ref_id);
      if(!refExits){
        throw new BadRequestException('The user is not have record.');
      } 
      
      const emailExits = await this.usersService.findUserByEmail(body.email);
      if(emailExits){
        throw new BadRequestException('The email is already to used.');
      }

      const usernameExits = await this.usersService.findUserByUsername(body.username);
      if(usernameExits){
        throw new BadRequestException('The username is already to used.');
      } 

    //   if (!/[a-zA-Z/d#$^+=!*()@%&.,]$/.test(body.password)) {
    //     throw new BadRequestException('Password invalid');
    //   }

      const mobileExits = await this.usersService.findUserByMobile(body.mobile);
      if(mobileExits){
        throw new BadRequestException('The mobile number already exits.');
      }
      
      const mob = body.mobile 
      body.mobile = "66"+ mob.substring(1,10);
    
      return body;
    }
  }
  