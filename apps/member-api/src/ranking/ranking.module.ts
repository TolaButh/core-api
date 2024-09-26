import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from '@app/common/entities/Rank';

@Module({
  imports:[TypeOrmModule.forFeature([Rank])],
  controllers: [RankingController],
  providers: [RankingService]
})
export class RankingModule {}
