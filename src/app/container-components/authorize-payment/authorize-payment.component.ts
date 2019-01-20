import { AuthorizePaymentResponse } from './authorize-payment.response';
import { LoadAuthorizePayment } from './actions/authorize-payment.actions';
import { Component, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../reducers';
import { Observable } from 'rxjs';
import { AuthorizePaymentRequest } from './authorize-payment.request';
import { State as AuthorizeState } from './reducers/authorize-payment.reducer';


enum OutcomeStatuses {
  Authorized = 'authorized',
}

@Component({
  selector: 'worldpay-authorize-payment',
  templateUrl: './authorize-payment.component.html',
  styleUrls: ['./authorize-payment.component.scss']
})
export class AuthorizePaymentComponent implements OnInit {
  authorizePayment: AuthorizeState;
  authorizePaymentRequest: AuthorizePaymentRequest;
  outcomeStatuses = OutcomeStatuses;
  product = {
    'description': 'Wolrd Pay Manual Book',
    'value': { 'currency': 'GBP', 'amount': 10 }
  };

  constructor(private store: Store<fromStore.State>) { }

  /**
   * When a user click the Payment button
   * @param paymentInstrument The Payment Details
   */
  payClicked(paymentInstrument) {
    this.authorizePaymentRequest.instruction.paymentInstrument = paymentInstrument;
    this.store.dispatch(new LoadAuthorizePayment(
      this.authorizePaymentRequest
    ));
  }

  ngOnInit() {

    this.store.pipe(select('authorize-payment'))
    .subscribe((authorizePayment) => {
      this.authorizePayment = authorizePayment;
    });


    this.authorizePaymentRequest = {
      'transactionReference': '12345678',
      'instruction': {
        ...this.product,
        'paymentInstrument': {
          'cvc': '', 'type': 'card/plain', 'cardNumber': '', 'cardHolderName': '',
          'cardExpiryDate': { 'month': null, 'year': null }
        }
      }
    };

  }

}
