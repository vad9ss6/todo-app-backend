import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('database url', this.configService.get<string>('DATABASE_URL'));
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'),
      entities: ['dist/**/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
    };
  }
}
