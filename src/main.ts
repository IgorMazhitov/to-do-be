import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import connectDB from 'ormconfig';

async function bootstrap() {
  config();

  // Create the TypeORM connection
  connectDB
    .initialize()
    .then(() => {
      console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
      console.error(`Data Source initialization error`, err);
    });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
