import { NestFactory } from '@nestjs/core';
import { MemberApiModule } from './member-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MemberApiModule);

  app.enableCors();
  app.setGlobalPrefix("/api");
  const config = new DocumentBuilder()
    .setTitle('Member API')
    .setDescription('Pumkub API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docsapi', app, document);
  await app.listen(3000);
}
bootstrap();
