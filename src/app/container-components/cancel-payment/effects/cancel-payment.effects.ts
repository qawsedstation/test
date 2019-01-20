import { CancelPaymentService } from '../services/cancel-payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CancelPaymentActionTypes, LoadCancelPayment } from '../actions/cancel-payment.actions';
import { of } from 'rxjs';

@Injectable()
export class CancelPaymentEffects {

  @Effect()
  loadCancelPayment$ = this.actions$.pipe(
    ofType(CancelPaymentActionTypes.LoadCancelPayment),
    mergeMap((action: LoadCancelPayment) =>
      this.cancelPaymentService.loadCancelPayment(action.request).pipe(
        // If successful, dispatch success action with result
        map(data => ({ type: CancelPaymentActionTypes.LoadCancelPaymentSuccess, payload: data })),
        // If request fails, dispatch failed action
        catchError((error: HttpErrorResponse) => of({ type: CancelPaymentActionTypes.LoadCancelPaymentFail, error: error }))
      )
    ));

  constructor(private actions$: Actions, private cancelPaymentService: CancelPaymentService) {}
}
