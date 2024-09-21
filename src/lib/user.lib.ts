import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { resError } from 'src/util/error.util';

@Injectable()
export class FindUserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findUser(user_id: string): Promise<UserEntity | null> {
    const findUser = await this.userRepo.findOne({
      where: { user_id },
    });

    if (!findUser) return null;

    return findUser;
  }

  async validateUser(
    user_id: string,
    password: string,
  ): Promise<UserEntity | null> {
    const findUser = await this.findUser(user_id);

    if (!findUser) resError(400, 1101);

    const validate = await bcrypt.compare(password, findUser.hash_password);

    if (!validate) resError(400, 1102);

    return findUser;
  }
}
