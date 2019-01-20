import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'worldpay-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  @Output() payClicked = new EventEmitter();

  paymentInstrument = {
    'cvc': '', 'type': 'card/plain', 'cardNumber': '', 'cardHolderName': '',
    'cardExpiryDate': { 'month': null, 'year': null }
  };

  constructor() { }

  pay() {
    this.payClicked.emit(this.paymentInstrument);
  }

  ngOnInit() {
  }

}
