import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { CategoryEcommerceEntity } from '@contler/entity/category-ecommerce.entity';
import { ProductEntity } from '@contler/entity';
import { environment } from '@contler/hotel/environments/environment';
import { Observable } from 'rxjs';
import { getLan } from '@contler/const';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  constructor(private httpClient: HttpClient) {}

  createEcommerce(
    ecommerce: EcommerceEntity,
    categories: CategoryEcommerceEntity[],
    products: ProductEntity[],
  ): Observable<EcommerceEntity> {
    const [to, from] = getLan();
    return this.httpClient.post<EcommerceEntity>(`${environment.apiUrl}ecommerce`, {
      ecommerce,
      categories,
      products,
      to,
      from,
    });
  }

  updateCommerce(ecommerce: EcommerceEntity): Observable<EcommerceEntity> {
    return this.httpClient.put<EcommerceEntity>(`${environment.apiUrl}ecommerce/`, ecommerce);
  }
}
