import { Organization } from 'src/organization/entities/organization.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique('unique_email', ['email'])
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Task[];

  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.users,
    { onDelete: 'CASCADE' },
  )
  organization: Organization;
}
