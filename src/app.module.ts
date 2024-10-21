import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'

import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      synchronize: true,
      database: 'OAUTH2db',
      entities: [],       
    }),
    PassportModule.register({session: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
