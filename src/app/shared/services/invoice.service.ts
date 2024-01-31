/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpMethodService } from '~/core/services/http-method.service';
import { Observable } from 'rxjs';
import { IInvoice } from '@interfaces/i-invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public invoice_url = environment.api_url + '/invoices/';

  constructor(private httpMethod: HttpMethodService) {}

  get_all_invoices(): Observable<any> {
    return this.httpMethod.get(this.invoice_url);
  }
  add_new_invoice(invoice_dto: any): Observable<any> {
    return this.httpMethod.post(this.invoice_url, invoice_dto);
  }

  get_single_invoice(id: number): Observable<any> {
    return this.httpMethod.get(this.invoice_url + id);
  }
  update_invoice(id: number, invoice_dto: IInvoice): Observable<any> {
    return this.httpMethod.put(this.invoice_url + id, invoice_dto);
  }
  delete_invoice(id: number): Observable<any> {
    return this.httpMethod.delete(this.invoice_url + id);
  }
}
