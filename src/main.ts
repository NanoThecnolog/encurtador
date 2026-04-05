import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DataAPIClient } from "@datastax/astra-db-ts";
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }))

  //versionamento da api
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  const port = process.env.PORT
  if (!port) throw new Error("Porta não definida")
  await app.listen(port);
  console.log("Encurtador rodando...", port)
}
bootstrap();