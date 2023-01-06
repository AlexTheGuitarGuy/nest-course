import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './typeorm';
import { CustomersModule } from './modules/customers/customers.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'Alex',
      password: '$%6nB78tOAOn',
      database: 'tutorial_db',
      entities,
      synchronize: true,
    }),
    CustomersModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
