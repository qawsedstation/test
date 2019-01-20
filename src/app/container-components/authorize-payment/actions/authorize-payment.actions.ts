import { AuthorizePaymentResponse } from './../authorize-payment.response';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizePaymentRequest } from '../authorize-payment.request';

export enum AuthorizePaymentActionTypes {
  LoadAuthorizePayment = 'Load AuthorizePayment',
  LoadAuthorizePaymentSuccess = 'Load AuthorizePayment Success',
  LoadAuthorizePaymentFail = 'Load AuthorizePayment Fail',
}

export class LoadAuthorizePayment implements Action {
  readonly type = AuthorizePaymentActionTypes.LoadAuthorizePayment;
  constructor(public request: AuthorizePaymentRequest) { }
}

export class LoadAuthorizePaymentSuccess implements Action {
  readonly type = AuthorizePaymentActionTypes.LoadAuthorizePaymentSuccess;
  constructor(public payload: AuthorizePaymentResponse) { }
}

export class LoadAuthorizePaymentFail implements Action {
  readonly type = AuthorizePaymentActionTypes.LoadAuthorizePaymentFail;
  constructor(public error: HttpErrorResponse) { }
}

export type AuthorizePaymentActions = LoadAuthorizePayment | LoadAuthorizePaymentSuccess | LoadAuthorizePaymentFail;

