import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreConfig } from '@contler/models';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { Observable } from 'rxjs';
import { OrderEcommerceRequest } from '@contler/models/order-ecommerce-request';
import { OrderEcommerceEntity } from '@contler/entity/order-ecommerce.entity';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private httpClient: HttpClient) {
    this.url = this.config.urlBackend;
  }

  getEcommerceById(ecommerceId: string): Observable<EcommerceEntity> {
    return this.httpClient.get<EcommerceEntity>(`${this.url}ecommerce/${ecommerceId}`);
  }

  createOrder(order: OrderEcommerceRequest): Observable<OrderEcommerceEntity> {
    return this.httpClient.post<OrderEcommerceEntity>(`${this.url}ecommerce/order`, order);
  }
}
