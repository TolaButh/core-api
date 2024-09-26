import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@app/common/entities/Users';
import { UserService } from '../user/user.service';
import { Languages } from '@app/common/entities/Languages';
import { Orders } from '@app/common/entities/Orders';
import { Rank } from '@app/common/entities/Rank';
import { Affiliates } from '@app/common/entities/Affiliates';

@Module({
  imports: [
  TypeOrmModule.forFeature([Users,Languages,Orders,Rank,Affiliates])],
  controllers: [RegisterController],
  providers: [RegisterService, UserService]
  
})
export class RegisterModule {}
