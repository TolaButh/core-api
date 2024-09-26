import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from '@app/common/entities/Platform';

@Module({
  imports: [TypeOrmModule.forFeature([Platform])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
