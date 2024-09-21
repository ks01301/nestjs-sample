import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_id: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
}
