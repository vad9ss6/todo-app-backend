import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config as loadEnvVariables } from 'dotenv';

async function bootstrap() {
  loadEnvVariables();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('To do Application')
    .setVersion('v1')
    .addBearerAuth()
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = +configService.get<number>('PORT', 3000);

  await app.listen(port);
}
bootstrap();
