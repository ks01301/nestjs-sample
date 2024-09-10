import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './../config/typeorm.config';
import Configs from 'src/config/configs';
import { UserModule } from 'src/api/user/user.module';
import { SignModule } from 'src/api/sign/sign.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      isGlobal: true,
      load: Configs,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
    SignModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
