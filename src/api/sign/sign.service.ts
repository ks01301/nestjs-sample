import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { FindUserService } from 'src/lib/user.lib';
import { Payload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { resOk } from 'src/util/response.util';
import * as bcrypt from 'bcrypt';
import { resError } from 'src/util/error.util';

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    private findUserService: FindUserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAccessToken(payload: Payload): string {
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(payload: Payload): Promise<string> {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.jwt_refresh_secret'),
      expiresIn: this.configService.get<string>('jwt.jwt_refresh_expire'),
    });

    await this.currentRefreshToken(payload.user_id, refresh_token);

    return refresh_token;
  }

  async currentRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<void> {
    const currentRefreshToken = await bcrypt.hash(refresh_token, 10);

    await this.userRepo.update({ user_id }, { currentRefreshToken });
  }

  async login({ user_id, password }: LoginDto) {
    const user = await this.findUserService.validateUser(user_id, password);

    const access_token = this.generateAccessToken({
      user_id: user.user_id,
      password,
    });

    const refresh_token = await this.generateRefreshToken({
      user_id: user.user_id,
      password,
    });

    return resOk(200, 'login', {
      user_id: user.user_id,
      name: user.name,
      access_token,
      refresh_token,
    });
  }

  async refresh(refresh_token: string) {
    try {
      const decodeRefreshToken = this.jwtService.verify(refresh_token, {
        secret: this.configService.get<string>('jwt.jwt_refresh_secret'),
      });

      if (!decodeRefreshToken)
        resError(401, 1000, 'not validate refresh token');

      const { currentRefreshToken } = await this.findUserService.validateUser(
        decodeRefreshToken.user_id,
        decodeRefreshToken.password,
      );

      const isValidate = await bcrypt.compare(
        refresh_token,
        currentRefreshToken,
      );

      if (!isValidate) resError(401, 1000, 'not validate refresh token');

      const new_access_token = this.generateAccessToken({
        user_id: decodeRefreshToken.user_id,
        password: decodeRefreshToken.password,
      });

      const new_refresh_token = await this.generateRefreshToken({
        user_id: decodeRefreshToken.user_id,
        password: decodeRefreshToken.password,
      });

      return resOk(200, 'generate new access token', {
        new_access_token,
        new_refresh_token,
      });
    } catch (err) {
      resError(err.status, err.response.errorCode, err.message);
    }
  }
}
