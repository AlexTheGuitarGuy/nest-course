import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) id: number) {
    const user = this.customersService.findCustomerById(id);
    if (!user)
      throw new HttpException(`Could not find customer with ID ${id}`, 404);
    return user;
  }

  @Get('')
  getAllCustomers() {
    return this.customersService.getCustomers();
  }

  @Post()
  @UsePipes(ValidationPipe)
  postCustomer(@Body() customer: CreateCustomerDto) {
    this.customersService.createCustomer(customer);
  }
}
