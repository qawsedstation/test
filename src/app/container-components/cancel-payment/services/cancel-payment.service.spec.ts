import { CancelPaymentResponse } from './../cancel-payment.response';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CancelPaymentService } from './cancel-payment.service';
const mockCancelPaymentResponse = require('./../mocks/cancel-payment.mocks.json');
import { CancelPaymentRequest } from '../cancel-payment.request';
import { HttpRequest } from '@angular/common/http';


describe('Service: CancelPaymentService', () => {
  let injector: TestBed;
  let service: CancelPaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CancelPaymentService]
    });
    injector = getTestBed();
    service = injector.get(CancelPaymentService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const cancelPaymentRequest: CancelPaymentRequest = {
    cancelLink: 'http://localhost:3003/payments/authorizations/cancellations/eyJrIjoiazNhYjYzMiJ9'
  };

  it('should call the CancelPayment api and return CancelPayment Details', (done: Function) => {
    service.loadCancelPayment(cancelPaymentRequest).subscribe((response: CancelPaymentResponse) => {
      expect(response).toBe(mockCancelPaymentResponse);
      done();
    });

    const serviceUrl = 'http://localhost:3003/payments/authorizations/cancellations/eyJrIjoiazNhYjYzMiJ9';

    const mockReq = httpMock.expectOne(
      (req: HttpRequest<any>): boolean => {
        return req.url.startsWith(serviceUrl);
      }
    );

    expect(mockReq.request.url).toEqual(serviceUrl);

    mockReq.flush(mockCancelPaymentResponse);
  });
});
