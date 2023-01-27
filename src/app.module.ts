import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './typeorm';
import { CustomersModule } from './modules/customers/customers.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '#5e7g@tM0J9FfqybQ',
      database: 'postgres',
      entities,
      synchronize: true,
    }),
    CustomersModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
