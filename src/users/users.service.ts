import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
}

export type UpdateUserDTO = {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser({ name, email, password }: CreateUserDTO): Promise<User> {
    return this.usersRepository.create({
      userId: uuid(),
      name,
      email,
      password: await hash(password, 8)
    })
  }

  async updateUser(userId: string, userUpdates: UpdateUserDTO): Promise<User> {
    return this.usersRepository.update({ userId }, userUpdates);
  }
}
