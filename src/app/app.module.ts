import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizePaymentModule } from './container-components/authorize-payment/authorize-payment.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CancelPaymentModule } from './container-components/cancel-payment/cancel-payment.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    AuthorizePaymentModule,
    BrowserAnimationsModule,
    CancelPaymentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
