import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../dto/CreatePaymentDto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'alex@gmail.com',
    },
    {
      email: 'dan@gmail.com',
    },
    {
      email: 'evan@gmail.com',
    },
    {
      email: 'fuck@gmail.com',
    },
  ];

  createPayment(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;

    if (!this.users.find((element) => element.email === email))
      throw new BadRequestException('Could not find user email.');

    return { success: true };
  }
}
