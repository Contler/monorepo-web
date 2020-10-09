import { Injectable, Optional } from '@angular/core';
import { CoreConfig, ProductRequest, RestaurantProductsModel } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { OrderEntity, ProductEntity, ProductOrderEntity } from '@contler/entity';
import { OrderRequest } from '@contler/models/order-request';

@Injectable()
export class ProductService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = this.config.urlBackend;
  }

  static convertProductToRestaurantProducts(products: ProductOrderEntity[]) {
    return products.reduce((previousValue, currentValue) => {
      if (!previousValue[currentValue.product.restaurant.name]) {
        previousValue[currentValue.product.restaurant.name] = [];
      }
      previousValue[currentValue.product.restaurant.name].push(currentValue);
      return previousValue;
    }, {} as RestaurantProductsModel);
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

  deleteProduct(productId: number) {
    return this.http.delete(`${this.url}product/${productId}`);
  }

  createOrder(orderRequest: OrderRequest) {
    this.sendNotification(orderRequest.hotel.uid);
    return this.http.post(`${this.url}product/order`, orderRequest);
  }

  getOrderByGuest(idGuest: string) {
    return this.http.get<OrderEntity[]>(`${this.url}guest/${idGuest}/order`);
  }

  getOrder(idOrder: number) {
    return this.http.get<OrderEntity>(`${this.url}product/order/${idOrder}`);
  }

  getOrdersByHotel(hotelId: string) {
    return this.http.get<OrderEntity[]>(`${this.url}hotel/${hotelId}/orders`);
  }

  updateOrder(order: OrderEntity) {
    return this.http.put(`${this.url}product/order`, order);
  }

  deleteOrder(idOrder: number) {
    return this.http.delete(`${this.url}product/order/${idOrder}`);
  }

  private sendNotification(hotelId: string) {
    this.http.get(`${this.url}hotel/${hotelId}/notification/product`).subscribe();
  }
}
