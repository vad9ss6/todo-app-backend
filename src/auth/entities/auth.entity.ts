import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty()
  user_name: string;

  @ApiProperty()
  password: string;
}
