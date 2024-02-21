import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        user_name: 'testuser',
        password: '1234567890',
      };

      const savedUser = { id: '1', ...createUserDto };
      jest.spyOn(userRepository, 'create').mockReturnValue(savedUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(savedUser);
    });
  });

  describe('findOne', () => {
    it('should find a user by username', async () => {
      const user_name = 'testuser';
      const user = { id: '1', user_name, password: '123456789' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(user_name);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(username)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteOne', () => {
    it('should delete a user', async () => {
      const userId = '1';
      const user = {
        id: userId,
        user_name: 'testuser',
        password: '1234567890',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(user);

      const result = await service.deleteOne(userId);

      expect(result).toEqual(user);
    });
  });
});
