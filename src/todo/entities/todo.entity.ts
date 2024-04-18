import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../dto/create-todo.dto';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  status: Status;

  @Column()
  description: string;

  @Column()
  user_id: string;
}
