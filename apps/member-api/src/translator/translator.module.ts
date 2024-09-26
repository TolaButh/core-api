import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorsController } from './translator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@app/common/entities/Users';

@Module({
  imports:[
   TypeOrmModule.forFeature([Users])
  ],
  controllers: [TranslatorsController],
  providers: [TranslatorService]
})
export class TranslatorModule {}
