import { LoadCancelPayment } from './actions/cancel-payment.actions';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../reducers';
import { CancelPaymentRequest } from './cancel-payment.request';
import { State as CancelPaymentState } from './reducers/cancel-payment.reducer';
import { State as AuthorizeState } from '../authorize-payment/reducers/authorize-payment.reducer';

@Component({
  selector: 'worldpay-cancel-payment',
  templateUrl: './cancel-payment.component.html',
  styleUrls: ['./cancel-payment.component.scss']
})
export class CancelPaymentComponent implements OnInit {
  cancelPayment: CancelPaymentState;
  authorizePayment: AuthorizeState;
  cancelPaymentRequest: CancelPaymentRequest;
  cancelLink: string;

  constructor(private store: Store<fromStore.State>) { }

  cancelPaymentButton() {
    if (this.authorizePayment && this.authorizePayment.data && this.authorizePayment.data._links['payments:cancel']) {
      this.cancelPaymentRequest = { 'cancelLink': this.authorizePayment.data._links['payments:cancel'].href };

      this.store.dispatch(new LoadCancelPayment(
        this.cancelPaymentRequest
      ));
    }
  }

  ngOnInit() {

    this.store.pipe(select('cancel-payment'))
      .subscribe((cancelPayment) => {
        this.cancelPayment = cancelPayment;
      });

    this.store.pipe(select('authorize-payment'))
      .subscribe((authorizePayment) => {
        this.authorizePayment = authorizePayment;
      });
  }

}
