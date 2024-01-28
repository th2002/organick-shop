/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpMethodService } from '~/core/services/http-method.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { iProduct } from '~/interfaces/iProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product_url = environment.api_url + '/products/';

  constructor(private httpMethod: HttpMethodService) {}

  allProduct(): Observable<any> {
    return this.httpMethod.get(this.product_url);
  }
  addNewProduct(product_dto: iProduct): Observable<any> {
    return this.httpMethod.post(this.product_url, product_dto);
  }

  singleProduct(id: number) {
    return this.httpMethod.get(this.product_url + id);
  }
  updateProduct(id: number, product_dto: iProduct): Observable<any> {
    return this.httpMethod.put(this.product_url + id, product_dto);
  }
  deleteProduct(id: number): Observable<any> {
    return this.httpMethod.delete(this.product_url + id);
  }
}
