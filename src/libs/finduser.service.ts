import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { findUser } from './interface/finduser.interface';
import { resError } from 'src/utils/response.util';

@Injectable()
export class FindUserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findUser(validateUser: findUser): Promise<UserEntity | null> {
    const findUser = await this.userRepo.findOne({
      where: { id: validateUser.id },
    });

    if (!findUser.id) return null;

    return findUser;
  }

  async validateUser(validateUser: findUser): Promise<UserEntity | null> {
    const findUser = await this.userRepo.findOne({
      where: { id: validateUser.id },
    });

    if (!findUser.id) return resError('not exist id');

    const validate = await bcrypt.compare(
      validateUser.password,
      findUser.hash_password,
    );

    if (!validate) return resError('invalid password');

    return findUser;
  }
}
