import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDTO, UpdateUserDTO, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUSers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() { name, email, password }: CreateUserDTO): Promise<User> {
    return this.usersService.createUser({ name, email, password });
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body() { name, email, password }: UpdateUserDTO): Promise<User> {
    return this.usersService.updateUser(userId, { name, email, password });
  }
}
