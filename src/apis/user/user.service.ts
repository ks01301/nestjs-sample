import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { resError } from 'src/utils/response.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async create(body: CreateUserDto) {
    const user = {
      id: body.id,
      hash_password: body.password,
      user_name: body.name,
    };
    return this.userRepo.insert(user).catch((error) => {
      resError(error);
    });
  }

  findAll() {
    return `This action returns all user`;
  }
}
