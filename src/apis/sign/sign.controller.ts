import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignService } from './sign.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Post()
  async login(@Body() body: LoginDto) {
    return this.signService.login(body);
  }

  @Get()
  @UseGuards(AuthGuard)
  async test(@Req() req: Request) {
    console.log(req.user);
    const user: any = req.user;
    return user;
    // return this.signService.test();
  }
}
