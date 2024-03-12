import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';

async function bootstrap() {
  config();

  // Create the TypeORM connection
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
