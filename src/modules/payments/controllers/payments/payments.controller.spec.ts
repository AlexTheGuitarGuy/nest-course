import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';
import { PaymentsService } from '../../services/payments/payments.service';
import { BadRequestException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  const requestMock = {
    query: {},
  } as unknown as Request;

  const responseMock = {
    status: jest.fn(() => responseMock),
    send: jest.fn(() => responseMock),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn(() => ({ success: true })),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('paymentsService should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a 400 status code', () => {
      controller.getPayments(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.send).toHaveBeenCalledWith({
        success: false,
        message: 'Please add both count and page query params.',
      });
    });

    it('should return a 200 status code', () => {
      requestMock.query = {
        count: '10',
        page: '2',
      };

      controller.getPayments(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(200);
    });
  });

  describe('createPayment', () => {
    it('should return a success flag', () => {
      const response = controller.createPayment({
        email: 'alex@gmail.com',
        amount: '69',
      });
      expect(response).toEqual({ success: true });
    });

    it('should throw a bad request exception', () => {
      jest
        .spyOn(paymentsService, 'createPayment')
        .mockImplementationOnce(() => {
          throw new BadRequestException('Could not find user email.');
        });

      try {
        controller.createPayment({
          email: 'asdas@gmail.com',
          amount: '69',
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
