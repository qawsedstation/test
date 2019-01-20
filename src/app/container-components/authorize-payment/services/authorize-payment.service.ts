import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthorizePaymentRequest } from '../authorize-payment.request';

@Injectable()
export class AuthorizePaymentService {
  constructor(private http: HttpClient) {}

  loadAuthorizePayment(request: AuthorizePaymentRequest): Observable<any> {

return this.http.post(environment.baseUrl + 'payments', { request });  }
}
