import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User, Todo],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    TodoModule,
  ],
})
export class AppModule {}
