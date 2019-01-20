import { AuthorizePaymentResponse } from '../authorize-payment.response';
import { Action } from '@ngrx/store';
import { AuthorizePaymentActions, AuthorizePaymentActionTypes } from '../actions/authorize-payment.actions';

export interface State {
  data?: AuthorizePaymentResponse;
  loading: boolean;
  error: Error;
}

export const initialState: State = {
  data: null,
  loading: false,
  error: null
};

export function reducer(state = initialState, action: AuthorizePaymentActions): State {
  switch (action.type) {

    case AuthorizePaymentActionTypes.LoadAuthorizePayment:
    return {
      ...state,
      loading: true,
      error: null
    };

    case AuthorizePaymentActionTypes.LoadAuthorizePaymentSuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };

    case AuthorizePaymentActionTypes.LoadAuthorizePaymentFail:
    return {
      ...state,
      loading: false,
      error: action.error
    };

    default:
      return state;
  }
}
