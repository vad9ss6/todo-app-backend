import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  user_name: string;

  @ApiProperty()
  password: string;
}
