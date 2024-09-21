import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import Configs from 'src/config/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { UserModule } from 'src/api/user/user.module';
import { SignModule } from 'src/api/sign/sign.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
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
