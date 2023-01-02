import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { Customer } from '../../types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'dan@gmail.com',
      name: 'dan',
    },
    {
      id: 2,
      email: 'samantha@gmail.com',
      name: 'samantha',
    },
    {
      id: 3,
      email: 'alejandro@gmail.com',
      name: 'alejandro',
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((element) => element.id === id);
  }

  createCustomer(customer: CreateCustomerDto) {
    this.customers.push(customer);
  }

  getCustomers() {
    return this.customers;
  }
}
