import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private usersRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto, user_id: string) {
    const todo = this.usersRepository.create({
      ...createTodoDto,
      user_id,
    });
    return this.usersRepository.save(todo);
  }

  async findAll(user_id: string) {
    const todo = await this.usersRepository.findBy({ user_id });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async findOne(id: string) {
    const todo = await this.usersRepository.findBy({ id });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.usersRepository.update(id, updateTodoDto);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async delete(id: string) {
    const todo = await this.usersRepository.delete(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }
}
