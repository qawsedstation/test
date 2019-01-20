import { CancelPaymentResponse } from './../cancel-payment.response';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CancelPaymentRequest } from '../cancel-payment.request';

export enum CancelPaymentActionTypes {
  LoadCancelPayment = 'Call CancelPayment',
  LoadCancelPaymentSuccess = 'Call CancelPayment Success',
  LoadCancelPaymentFail = 'Call CancelPayment Fail',
}

export class LoadCancelPayment implements Action {
  readonly type = CancelPaymentActionTypes.LoadCancelPayment;
  constructor(public request: CancelPaymentRequest) { }
}

export class LoadCancelPaymentSuccess implements Action {
  readonly type = CancelPaymentActionTypes.LoadCancelPaymentSuccess;
  constructor(public payload: CancelPaymentResponse) { }
}

export class LoadCancelPaymentFail implements Action {
  readonly type = CancelPaymentActionTypes.LoadCancelPaymentFail;
  constructor(public error: HttpErrorResponse) { }
}

export type CancelPaymentActions = LoadCancelPayment | LoadCancelPaymentSuccess | LoadCancelPaymentFail;

