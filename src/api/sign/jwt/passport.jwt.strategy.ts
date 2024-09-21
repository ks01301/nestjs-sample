import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Payload } from '../interface/payload.interface';
import { ConfigService } from '@nestjs/config';
import { FindUserService } from 'src/lib/user.lib';
import { resError } from 'src/util/error.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private findUserService: FindUserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.jwt_secret'),
    });
  }

  async validate(
    { user_id, password }: Payload,
    done: VerifiedCallback,
  ): Promise<any> {
    if (!user_id || !password) resError(401, 1001);

    const user = await this.findUserService.validateUser(user_id, password);

    return done(null, user);
  }
}
