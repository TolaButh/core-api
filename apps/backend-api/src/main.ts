import { NestFactory } from '@nestjs/core';
import { BackendApiModule } from './backend-api.module';

async function bootstrap() {
  const app = await NestFactory.create(BackendApiModule);
  await app.listen(3000);
}
bootstrap();
