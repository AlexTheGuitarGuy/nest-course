import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
    unique: true,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;
}
