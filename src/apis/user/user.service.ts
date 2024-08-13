import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { resError, resOk } from 'src/utils/response.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async create(body: CreateUserDto) {
    const hash = await bcrypt.hash(body.password, 10);

    const user = {
      id: body.id,
      hash_password: hash,
      user_name: body.name,
      email: body.email,
    };

    return this.userRepo
      .insert(user)
      .then(() => resOk(`create ${user.user_name} user`))
      .catch((error) => {
        resError('create user error', error);
      });
  }
}
