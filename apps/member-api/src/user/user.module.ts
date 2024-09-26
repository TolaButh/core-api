import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@app/common/entities/Users';
import { Languages } from '@app/common/entities/Languages';
import { Orders } from '@app/common/entities/Orders';
import { Rank } from '@app/common/entities/Rank';
import { Affiliates } from '@app/common/entities/Affiliates';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Languages,Orders,Rank,Affiliates])],
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule.forFeature([Users,Languages,Orders,Rank])]
})
export class UserModule {}
