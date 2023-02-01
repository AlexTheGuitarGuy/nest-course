import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './typeorm';
import { CustomersModule } from './modules/customers/customers.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { GatewayModule } from './modules/websocket/gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '#5e7g@tM0J9FfqybQ',
      database: 'tutorial_db',
      entities,
      synchronize: true,
    }),
    CustomersModule,
    UsersModule,
    AuthModule,
    PaymentsModule,
    GatewayModule,
  ],
})
export class AppModule {}
