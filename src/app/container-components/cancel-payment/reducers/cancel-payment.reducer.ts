import { CancelPaymentResponse } from '../cancel-payment.response';
import { Action } from '@ngrx/store';
import { CancelPaymentActions, CancelPaymentActionTypes } from '../actions/cancel-payment.actions';

export interface State {
  data?: CancelPaymentResponse;
  loading: boolean;
  error: Error;
}

export const initialState: State = {
  data: null,
  loading: false,
  error: null
};

export function reducer(state = initialState, action: CancelPaymentActions): State {
  switch (action.type) {

    case CancelPaymentActionTypes.LoadCancelPayment:
    return {
      ...state,
      loading: true,
      error: null
    };

    case CancelPaymentActionTypes.LoadCancelPaymentSuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };

    case CancelPaymentActionTypes.LoadCancelPaymentFail:
    return {
      ...state,
      loading: false,
      error: action.error
    };

    default:
      return state;
  }
}
