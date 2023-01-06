import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { NotFoundException } from '../../../../exceptions/NotFoundException';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject('CUSTOMERS_SERVICE')
    private readonly customersService: CustomersService,
  ) {}

  @Get('')
  getAllCustomers() {
    const customers = this.customersService.getCustomers();

    return { count: customers.length, data: customers };
  }

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (!customer)
      throw new NotFoundException({
        entity: 'customer',
        key: 'ID',
        value: id,
      });

    return customer;
  }

  @Post()
  @UsePipes(ValidationPipe)
  postCustomer(@Body() { email, name, address }: CreateCustomerDto) {
    this.customersService.createCustomer({ email, name, address });

    return {};
  }
}
