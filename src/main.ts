import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { CoreExceptionFilter } from './_config/exception/Core.exception';

import { CorePipe } from './_config/pipe/Core.pipe';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Конфигурация Swagger
  const config = new DocumentBuilder()
    .setTitle('SMS Service')
    .setDescription('The API sms service')
    .setVersion('1.0')
    .addTag('sms')
    .build();
  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(app, config),
  );

  // Отключаем защиту cors
  app.enableCors();

  // Глобальный перехвадчик ошибок
  app.useGlobalFilters(new CoreExceptionFilter());

  // Добавляем валидацию
  app.useGlobalPipes(new CorePipe());

  // Стартуем приложение
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
