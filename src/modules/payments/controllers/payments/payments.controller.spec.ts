import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';

describe('PaymentsController', () => {
  let controller: PaymentsController;

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
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
});
