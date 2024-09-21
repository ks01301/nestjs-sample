import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignController } from './sign.controller';
import { UserEntity } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindUserService } from 'src/lib/user.lib';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/passport.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),

    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.jwt_secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.jwt_expire') },
      }),
    }),
  ],
  controllers: [SignController],
  providers: [SignService, FindUserService, JwtStrategy],
})
export class SignModule {}
