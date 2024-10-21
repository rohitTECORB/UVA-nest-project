import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { auth } from 'express-openid-connect';
import { Request, Response } from 'express'; 
import * as session from 'express-session';
import * as passport from 'passport';


dotenv.config();

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.setGlobalPrefix('api');





  const port = 3001;
  await app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

bootstrap();
