import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middleware/validate-customer/validate-customer.middleware';

@Module({
  controllers: [CustomersController],
  providers: [{ provide: 'CUSTOMERS_SERVICE', useClass: CustomersService }],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustomerMiddleware)
      .exclude({
        path: 'api/customers',
        method: RequestMethod.GET,
      })
      .forRoutes(CustomersController);
  }
}
