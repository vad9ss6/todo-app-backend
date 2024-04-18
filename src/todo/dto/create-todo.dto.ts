import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  ToDo = 'todo',
  Done = 'done',
}

export class CreateTodoDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  description: string;
}
