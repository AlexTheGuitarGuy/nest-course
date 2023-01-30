import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
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
}
