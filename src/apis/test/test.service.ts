import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TestService {
  constructor(private configService: ConfigService) {}

  findAll() {
    console.log(this.configService.get<number>('app'));
    console.log(this.configService.get<string>('db'));
    return `This action returns all test`;
  }
}
