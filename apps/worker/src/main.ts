import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { RmqService } from '@app/common/rmq/rmq.service';
import { WORKER } from '@app/common/constants/modules';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(process.env.SITE_NAME + "_" + WORKER));
  await app.startAllMicroservices();
}
bootstrap();
