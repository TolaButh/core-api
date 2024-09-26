import { Module } from '@nestjs/common';
import { TransferLogsService } from './transfer-logs.service';
import { TransferLogsController } from './transfer-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferLogs } from '@app/common/entities/TransferLogs';
import { Users } from '@app/common/entities/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransferLogs, Users]),
  ],
  providers: [TransferLogsService],
  controllers: [TransferLogsController]
})
export class TransferLocksModule {}
