import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { CategoryEcommerceEntity } from '@contler/entity/category-ecommerce.entity';
import { ProductEntity } from '@contler/entity';
import { environment } from '@contler/hotel/environments/environment';
import { Observable } from 'rxjs';
import { getLan } from '@contler/const';
import { ProductEcommerceEntity } from '@contler/entity/product-ecommerce.entity';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  constructor(private httpClient: HttpClient) {}

  createEcommerce(
    ecommerce: EcommerceEntity,
    categories: CategoryEcommerceEntity[],
    products: ProductEcommerceEntity[],
  ): Observable<EcommerceEntity> {
    const [to, from] = getLan();
    const productsForAdd = products.map((product) => {
      return { product, to, from };
    });
    return this.httpClient.post<EcommerceEntity>(`${environment.apiUrl}ecommerce`, {
      ecommerce,
      categories,
      products: productsForAdd,
      to,
      from,
    });
  }

  updateCommerce(ecommerce: EcommerceEntity): Observable<EcommerceEntity> {
    const [to, from] = getLan();
    return this.httpClient.put<EcommerceEntity>(`${environment.apiUrl}ecommerce/`, { ecommerce, to, from });
  }

  getEcommerceById(ecommerceId: string): Observable<EcommerceEntity> {
    return this.httpClient.get<EcommerceEntity>(`${environment.apiUrl}ecommerce/${ecommerceId}`);
  }
  getEcommerceByHotelUid(hotelUid: string): Observable<EcommerceEntity[]> {
    return this.httpClient.get<EcommerceEntity[]>(`${environment.apiUrl}ecommerce/hotel/${hotelUid}`);
  }
  removeEcommerce(ecommerceId: string): Observable<EcommerceEntity[]> {
    return this.httpClient.delete<EcommerceEntity[]>(`${environment.apiUrl}ecommerce/${ecommerceId}`);
  }

  updateProduct(ecommerceId: string, product: ProductEntity, hotelUid: string): Observable<ProductEntity> {
    const [to, from] = getLan();
    return this.httpClient.put<ProductEntity>(
      `${environment.apiUrl}ecommerce/${ecommerceId}/product/${product.id}`,
      {
        to,
        from,
        product,
        hotelUid,
      },
    );
  }

  createCategory(category: CategoryEcommerceEntity): Observable<CategoryEcommerceEntity> {
    const [to, from] = getLan();
    return this.httpClient.post<CategoryEcommerceEntity>(
      `${environment.apiUrl}ecommerce/${category.ecommerce.id}/category`,
      {
        to,
        from,
        category,
      },
    );
  }

  removeCategory(categoryId: number, ecommerceId: string): Observable<CategoryEcommerceEntity> {
    return this.httpClient.delete<CategoryEcommerceEntity>(
      `${environment.apiUrl}ecommerce/${ecommerceId}/category/${categoryId}`,
    );
  }

  removeProduct(ecommerceId: string, productId: string): Observable<ProductEcommerceEntity> {
    return this.httpClient.delete<ProductEcommerceEntity>(
      `${environment.apiUrl}ecommerce/${ecommerceId}/product/${productId}`,
    );
  }

  createProduct(ecommerceId: string, product: ProductEcommerceEntity): Observable<ProductEcommerceEntity> {
    const [to, from] = getLan();
    return this.httpClient.post<ProductEcommerceEntity>(
      `${environment.apiUrl}ecommerce/${ecommerceId}/product`,
      { product, to, from },
    );
  }
}
