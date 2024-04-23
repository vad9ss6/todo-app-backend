import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { TypeOrmConfigService } from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env.${process.env.NODE_ENV}` }),
    AuthModule,
    UsersModule,
    TodoModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
