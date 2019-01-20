import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCancelPayment from './reducers/cancel-payment.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CancelPaymentEffects } from './effects/cancel-payment.effects';
import { CancelPaymentComponent } from './cancel-payment.component';
import { CancelPaymentService } from './services/cancel-payment.service';
import { MatButtonModule } from '@angular/material/button';
import * as fromAuthorizePayment from '../authorize-payment/reducers/authorize-payment.reducer';


@NgModule({
  declarations: [CancelPaymentComponent],
  exports: [CancelPaymentComponent],
  providers: [
    CancelPaymentService
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    StoreModule.forFeature('cancel-payment', fromCancelPayment.reducer),
    StoreModule.forFeature('authorize-payment', fromAuthorizePayment.reducer),
    EffectsModule.forFeature([CancelPaymentEffects])
  ]
})
export class CancelPaymentModule { }
