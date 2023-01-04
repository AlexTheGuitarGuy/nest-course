import { Module } from '@nestjs/common';
import { CustomersModule } from './modules/customers/customers.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CustomersModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
