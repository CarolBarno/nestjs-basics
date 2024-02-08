import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './configs/swagger.config';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

const configService = new ConfigService();
const port =
  configService.get('PORT') === undefined ? '3000' : configService.get('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  const document = await swaggerConfig(app, port);
  SwaggerModule.setup('swagger-ui', app, document);
  console.log(`Swagger UI is running on: http://localhost:${port}/swagger-ui`);
  await app.listen(`${port}`);
}
bootstrap();
