import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('database url', this.configService.get<string>('DATABASE_URL').replace('?sslmode=require', '?sslmode=disable'));
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL').replace('?sslmode=require', '?sslmode=no-verify'),
      entities: ['dist/**/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
    };
  }
}
