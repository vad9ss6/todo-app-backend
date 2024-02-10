import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
