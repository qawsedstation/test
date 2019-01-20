import { PaymentFormComponent } from './../../shared-components/payment-form/payment-form.component';
import { ProductComponent } from './../../shared-components/product/product.component';
import { CancelPaymentModule } from './../cancel-payment/cancel-payment.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuthorizePayment from './reducers/authorize-payment.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthorizePaymentEffects } from './effects/authorize-payment.effects';
import { AuthorizePaymentComponent } from './authorize-payment.component';
import { AuthorizePaymentService } from './services/authorize-payment.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AuthorizePaymentComponent, ProductComponent, PaymentFormComponent],
  providers: [
    AuthorizePaymentService
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    CancelPaymentModule,
    StoreModule.forFeature('authorize-payment', fromAuthorizePayment.reducer),
    EffectsModule.forFeature([AuthorizePaymentEffects])
  ]
})
export class AuthorizePaymentModule { }
