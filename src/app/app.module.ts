import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import dbConfig from 'src/config/db.config';
import appConfig from 'src/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './../config/typeorm.config';
import { UserModule } from 'src/apis/user/user.module';
import { SignModule } from 'src/apis/sign/sign.module';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      isGlobal: true,
      load: [appConfig, dbConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
    SignModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
