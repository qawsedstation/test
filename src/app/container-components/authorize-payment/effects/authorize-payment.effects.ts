import { AuthorizePaymentService } from '../services/authorize-payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthorizePaymentActionTypes, LoadAuthorizePayment } from '../actions/authorize-payment.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthorizePaymentEffects {

  @Effect()
  loadAuthorizePayment$ = this.actions$.pipe(
    ofType(AuthorizePaymentActionTypes.LoadAuthorizePayment),
    mergeMap((action: LoadAuthorizePayment) =>
      this.authorizePaymentService.loadAuthorizePayment(action.request).pipe(
        // If successful, dispatch success action with result
        map(data => ({ type: AuthorizePaymentActionTypes.LoadAuthorizePaymentSuccess, payload: data })),
        // If request fails, dispatch failed action
        catchError((error: HttpErrorResponse) => of({ type: AuthorizePaymentActionTypes.LoadAuthorizePaymentFail, error: error }))
      )
    ));

  constructor(private actions$: Actions, private authorizePaymentService: AuthorizePaymentService) {}
}
