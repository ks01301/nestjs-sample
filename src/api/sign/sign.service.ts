import { Injectable } from '@nestjs/common';
import { resOk } from 'src/util/response.util';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interface/payload.interface';
import { FindUserService } from 'src/lib/finduser.service';
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
    console.log('a');
    return resOk('test');
  }
}
