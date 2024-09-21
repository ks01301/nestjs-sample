import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { resOk } from 'src/util/response.util';
import { resError } from 'src/util/error.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async create({ user_id, password, name }: CreateUserDto) {
    const hash = await bcrypt.hash(password, 10);

    const user = {
      user_id,
      hash_password: hash,
      name: name,
    };

    return this.userRepo
      .insert(user)
      .then(() => resOk(200, 'create account'))
      .catch((err) => {
        resError(400, 1000, err);
      });
  }
}
