import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { auth } from 'express-openid-connect';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // Retrieve ConfigService instance

  
  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: configService.get<string>('SECRET'),
    clientId: configService.get<string>('CLIENT_ID'),
    issuerBaseURL: configService.get<string>('ISSUER_BASE_URL'),
  };

  app.use(auth(config));

  app.setGlobalPrefix('api');


  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port, () => {
    console.log('Google OAuth server is running on port:', `${port}`);
  });
}

bootstrap();
