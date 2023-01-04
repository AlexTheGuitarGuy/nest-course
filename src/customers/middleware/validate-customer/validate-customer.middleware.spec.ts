import { ValidateCustomerMiddleware } from './validate-customer.middleware';

describe('ValidateCustomerMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateCustomerMiddleware()).toBeDefined();
  });
});
