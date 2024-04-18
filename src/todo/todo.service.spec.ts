import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { Status } from './dto/create-todo.dto';

describe('TodoService', () => {
  let service: TodoService;
  let userRepository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    userRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const createTodoDto = {
        title: 'some todo',
        description: 'any tasks',
        status: Status.ToDo,
      };

      const user_id = '1234';

      const savedTodo = { id: '1', user_id, ...createTodoDto };
      jest.spyOn(userRepository, 'create').mockReturnValue(savedTodo);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedTodo);

      const result = await service.create(createTodoDto, user_id);

      expect(result).toEqual(savedTodo);
    });
  });

  describe('findOne', () => {
    it('should find a todo by id', async () => {
      const id = '1';
      const todo = [
        {
          id,
          user_id: '1234',
          title: 'some todo',
          description: 'any tasks',
          status: Status.ToDo,
        },
      ];

      jest.spyOn(userRepository, 'findBy').mockResolvedValue(todo);

      const result = await service.findOne(id);

      expect(result).toEqual(todo);
    });

    it('should throw NotFoundException if todo does not exist', async () => {
      const todoId = '1';

      jest.spyOn(userRepository, 'findBy').mockResolvedValue(null);

      await expect(service.findOne(todoId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteOne', () => {
    it('should delete a todo', async () => {
      const todoId = '4';
      const deleteResult = { raw: [], affected: 1 };
      jest.spyOn(userRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await service.delete(todoId);

      expect(result).toEqual(deleteResult);
    });

    it('should throw NotFoundException if todo is not found', async () => {
      const id = 'non-existing-id';

      jest.spyOn(userRepository, 'delete').mockResolvedValue(null);

      await expect(service.delete(id)).rejects.toThrow(NotFoundException);
    });
  });
});
