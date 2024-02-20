import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('user_name') user_name: string) {
    return this.usersService.findOne(user_name);
  }

  @ApiBearerAuth()
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }
}
