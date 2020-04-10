import { Injectable, Optional } from '@angular/core';
import { CoreConfig, ProductRequest } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { ProductEntity } from '@contler/entity';
import { OrderRequest } from '@contler/models/order-request';

@Injectable()
export class ProductService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = this.config.urlBackend;
  }

  createProduct(request: ProductRequest) {
    return this.http.post(`${this.url}product`, request);
  }

  getAllProducts(hotelId: string) {
    return this.http.get<ProductEntity[]>(`${this.url}hotel/${hotelId}/product`);
  }

  getProduct(productId: number) {
    return this.http.get<ProductEntity>(`${this.url}product/${productId}`);
  }

  updateProduct(product: ProductEntity) {
    return this.http.post(`${this.url}product/${product.id}`, product);
  }

  createOrder(orderRequest: OrderRequest) {
    return this.http.post(`${this.url}product/order`, orderRequest);
  }
}
