import { Injectable } from '@nestjs/common';
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
    const todo = this.usersRepository.create({ ...createTodoDto, user_id });
    return this.usersRepository.save(todo);
  }

  findAll(user_id: string) {
    const todo = this.usersRepository.findBy({ user_id });
    return todo;
  }

  findOne(id: string) {
    const todo = this.usersRepository.findBy({ id });
    return todo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = this.usersRepository.update(id, updateTodoDto);
    return todo;
  }

  remove(id: string) {
    const todo = this.usersRepository.delete(id);
    return todo;
  }
}
