import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDto } from '../../dto/CreatePaymentDto';
import { PaymentsService } from '../../services/payments/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENTS_SERVICE')
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get('')
  getPayments(@Req() request: Request, @Res() response: Response) {
    const { count, page } = request.query;

    if (!count || !page)
      response.status(400).send({
        success: false,
        message: 'Please add both count and page query params.',
      });
    else response.status(200);
  }

  @Post('')
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }
}
