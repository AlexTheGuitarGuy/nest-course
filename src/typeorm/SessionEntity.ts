import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { ISession } from 'connect-typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity implements ISession {
  @Index()
  @Column('bigint', { name: 'deleteDate' })
  public expiredAt = Date.now();

  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @Column('text')
  json = '';

  @DeleteDateColumn()
  public destroyedAt?: Date;
}
