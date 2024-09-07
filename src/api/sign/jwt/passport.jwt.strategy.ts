import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { FindUserService } from 'src/lib/finduser.service';
import { Payload } from '../interface/payload.interface';
import { ConfigService } from '@nestjs/config';
import { resError } from 'src/util/response.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private findUserService: FindUserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: true,
      secretOrKey: configService.get<string>('jwt.jwt_secret'),
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const user = await this.findUserService.findUser(payload);

    if (!user) resError('user does not exist.', null, HttpStatus.UNAUTHORIZED);

    return done(null, user);
  }
}
