import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const logger = new Logger();

  app.enableCors({
    origin: config.getOrThrow<string>('HTTP_CORS'),
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gateway Service')
    .setDescription('Gateway Service API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, swaggerDocument, {
    yamlDocumentUrl: '/openapi.yaml'
  });

  const port = config.getOrThrow<number>('HTTP_PORT');
  const host = config.getOrThrow<string>('HTTP_HOST');

  await app.listen(port);

  logger.log(`Gateway service is running on port ${port}`);
  logger.log(`Swagger service is running on port ${host}/docs`);
}
bootstrap();
