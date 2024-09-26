import { Module } from '@nestjs/common';
import { BackendApiController } from './backend-api.controller';
import { BackendApiService } from './backend-api.service';

@Module({
  imports: [],
  controllers: [BackendApiController],
  providers: [BackendApiService],
})
export class BackendApiModule {}
