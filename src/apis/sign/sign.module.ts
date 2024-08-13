import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignController } from './sign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FindUserService } from 'src/libs/finduser.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/passport.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.jwt_secret'),
        signOptions: { expiresIn: config.get<string>('jwt.jwt_expire') },
      }),
    }),
    PassportModule,
  ],
  controllers: [SignController],
  providers: [SignService, FindUserService, JwtStrategy],
})
export class SignModule {}
