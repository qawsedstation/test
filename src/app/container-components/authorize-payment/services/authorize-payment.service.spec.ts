import { AuthorizePaymentResponse } from './../authorize-payment.response';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorizePaymentService } from './authorize-payment.service';
import { HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
const mockAuthorizePaymentResponse = require('./../mocks/authorize-payment.mocks.json');
import { AuthorizePaymentRequest } from '../authorize-payment.request';


describe('Service: AuthorizePaymentService', () => {
  let injector: TestBed;
  let service: AuthorizePaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorizePaymentService]
    });
    injector = getTestBed();
    service = injector.get(AuthorizePaymentService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const authorizePaymentRequest: AuthorizePaymentRequest = {
    'transactionReference': 'your-transaction-reference',
    'instruction': {
      'description': 'book', 'value': { 'currency': 'GBP', 'amount': 789 },
      'paymentInstrument': {
        'cvc': '666', 'type': 'card/plain', 'cardNumber': '4444333322221111', 'cardHolderName': 'John Appleseed',
        'billingAddress':
          { 'address1': ' 270-289 Milton Rd', 'address2': 'Milton', 'countryCode': 'GB', 'postalCode': 'CB4 0WE', 'state': 'CAMBS' },
        'cardExpiryDate': { 'month': 7, 'year': 2099 }
      }
    }
  };

  it('should call the AuthorizePayment api and return AuthorizePayment', (done: Function) => {
    service.loadAuthorizePayment(authorizePaymentRequest)
    .subscribe((response: AuthorizePaymentResponse) => {
      expect(response).toBe(mockAuthorizePaymentResponse);
      done();
    });

    const serviceUrl = environment.baseUrl + 'payments';

    const mockReq = httpMock.expectOne(
      (req: HttpRequest<any>): boolean => {
        return req.url.startsWith(serviceUrl);
      }
    );

    expect(mockReq.request.url).toEqual(serviceUrl);

    mockReq.flush(mockAuthorizePaymentResponse);
  });
});
