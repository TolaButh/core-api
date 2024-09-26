import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from '@app/common/entities/Platform';
import { Categories } from '@app/common/entities/Categories';

@Module({
  imports:[TypeOrmModule.forFeature([Platform,Categories])],
  controllers: [PlatformController],
  providers: [PlatformService]
})
export class PlatformModule {}
