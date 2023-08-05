import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // apply to global, whitelist for fix the input form value no more or no less
  app.useGlobalPipes( new ValidationPipe(
    {
      whitelist: true,
    }
  ))
  await app.listen(3000);
}
bootstrap();
