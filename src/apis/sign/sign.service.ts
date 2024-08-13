import { Injectable } from '@nestjs/common';
import { resOk } from 'src/utils/response.util';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interface/payload.interface';
import { FindUserService } from 'src/libs/finduser.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class SignService {
  constructor(
    private jwtService: JwtService,
    private findUserService: FindUserService,
  ) {}

  async login(body: LoginDto) {
    console.log(body);
    const { id, user_name } = await this.findUserService.validateUser(body);

    const payload: Payload = { id, user_name };
    const accessToken = this.jwtService.sign(payload);

    return resOk('login success', { accessToken });
  }

  async test() {
    const locale = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
    });

    console.log(locale);
    console.log(new Date(locale));
    return resOk('test');
  }
}
