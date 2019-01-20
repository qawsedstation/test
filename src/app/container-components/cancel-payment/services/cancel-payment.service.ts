import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CancelPaymentRequest } from '../cancel-payment.request';

@Injectable()
export class CancelPaymentService {
  constructor(private http: HttpClient) {}

  loadCancelPayment(request: CancelPaymentRequest): Observable<any> {

return this.http.post(request.cancelLink, {});  }
}
