import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { SignService } from './sign.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.signService.login(loginDto);
  }

  @Post('refresh')
  refresh(
    @Body()
    { refresh_token }: { refresh_token: string },
  ) {
    return this.signService.refresh(refresh_token);
  }

  @Get()
  @UseGuards(AuthGuard)
  token(@Req() req: Request) {
    console.log(req.user);
    return 'ok';
  }
}
