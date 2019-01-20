import { LoadAuthorizePayment, AuthorizePaymentActionTypes } from '../actions/authorize-payment.actions';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';

import { AuthorizePaymentEffects } from './authorize-payment.effects';
import { AuthorizePaymentService } from '../services/authorize-payment.service';
import { AuthorizePaymentResponse } from '../authorize-payment.response';
import { AuthorizePaymentRequest } from '../authorize-payment.request';

import { HttpErrorResponse } from '@angular/common/http';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

const mockAuthorizePaymentResponse = require('./../mocks/authorize-payment.mocks.json');


describe('Authorize Payment Effects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: AuthorizePaymentEffects;
  let authorizePaymentService: any;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      providers: [
        AuthorizePaymentEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthorizePaymentService,
          useValue: jasmine.createSpyObj('customerService', ['loadAuthorizePayment'])
        }
      ]
    });

    effects = TestBed.get(AuthorizePaymentEffects);
    authorizePaymentService = TestBed.get(AuthorizePaymentService);

  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return a LoadAuthorizePaymentSuccess action, on success', function () {
    const payload: AuthorizePaymentResponse = mockAuthorizePaymentResponse;

    authorizePaymentService.loadAuthorizePayment.and.returnValue(of(payload));
    const authorizePaymentRequest: AuthorizePaymentRequest = {
      'transactionReference': 'your-transaction-reference', 'instruction':
      {
        'description': 'book', 'value': { 'currency': 'GBP', 'amount': 789 },
        'paymentInstrument':
        {
          'cvc': '666', 'type': 'card/plain', 'cardNumber': '4444333322221111', 'cardHolderName': 'John Appleseed',
          'cardExpiryDate': { 'month': 7, 'year': 2099 }
        }
      }
    };

    const actions: Observable<any> = cold('a', { a: new LoadAuthorizePayment(authorizePaymentRequest) });
    effects = new AuthorizePaymentEffects(new Actions(actions), authorizePaymentService);
    const expected = cold('b', {
      b:
        { type: AuthorizePaymentActionTypes.LoadAuthorizePaymentSuccess, payload: payload }
    });

    expect(effects.loadAuthorizePayment$).toBeObservable(expected);
  });

  it('should return a LoadAuthorizePaymentFail action, on failure', function () {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({ error: 'Error thrown' });
    const authorizePaymentRequest: AuthorizePaymentRequest = {
      'transactionReference': 'your-transaction-reference',
      'instruction': {
        'description': 'book', 'value': { 'currency': 'GBP', 'amount': 789 },
        'paymentInstrument': {
          'cvc': '666', 'type': 'card/plain', 'cardNumber': '4444333322221111', 'cardHolderName': 'John Appleseed',
          'cardExpiryDate': { 'month': 7, 'year': 2099 }
        }
      }
    };

    authorizePaymentService.loadAuthorizePayment.and.returnValue(throwError(errorResponse));

    const actions: Observable<any> = cold('a', { a: new LoadAuthorizePayment(authorizePaymentRequest) });
    effects = new AuthorizePaymentEffects(new Actions(actions), authorizePaymentService);
    const expected = cold('b', {
      b:
        { type: AuthorizePaymentActionTypes.LoadAuthorizePaymentFail, error: errorResponse }
    });

    expect(effects.loadAuthorizePayment$).toBeObservable(expected);
  });

});
