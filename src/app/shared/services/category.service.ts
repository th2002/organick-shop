/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpMethodService } from '~/core/services/http-method.service';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { ICategory } from '~/interfaces/i-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public category_url = environment.api_url + '/categories/';

  constructor(private httpMethod: HttpMethodService) {}

  allCategory(): Observable<any> {
    return this.httpMethod.get(this.category_url);
  }
  addNewCategory(cate_dto: ICategory): Observable<any> {
    return this.httpMethod.post(this.category_url, cate_dto);
  }

  singleCategory(id: number) {
    return this.httpMethod.get(this.category_url + id);
  }
  updateCategory(id: number, cate_dto: ICategory): Observable<any> {
    return this.httpMethod.put(this.category_url + id, cate_dto);
  }
  deleteCategory(id: number): Observable<any> {
    return this.httpMethod.delete(this.category_url + id);
  }
}
