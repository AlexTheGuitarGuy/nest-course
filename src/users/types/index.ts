import { Exclude } from 'class-transformer';

export interface User {
  name: string;
  password: string;
}

export class SerializedUser {
  name: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
