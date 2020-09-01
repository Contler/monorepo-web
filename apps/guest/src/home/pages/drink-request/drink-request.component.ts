import { Component } from '@angular/core';
import { ProductService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ProductEntity } from '@contler/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListModel } from '@contler/models/product-list-model';
import { RequestService } from 'guest/services/request.service';
import { MessagesService } from 'guest/services/messages/messages.service';

@Component({
  selector: 'contler-drink-request',
  templateUrl: './drink-request.component.html',
  styleUrls: ['./drink-request.component.scss'],
})
export class DrinkRequestComponent {
  products: ProductListModel[] = [];
  load = true;
  loading = false;
  id = '';
  private productSelected: any;

  constructor(
    private requestService: RequestService,
    private messagesService: MessagesService,
    private router: Router,
    productService: ProductService,
    guestService: GuestService,
    route: ActivatedRoute,
  ) {
    route.params.subscribe(data => (this.id = data.id));

    guestService.$hotel
      .pipe(
        take(1),
        switchMap(hotel => productService.getAllProducts(hotel!.uid)),
        map(products => products.filter(prod => prod.state && prod.category === 'Bebidas')),
        map(products => products.map(prod => ({ product: prod, quantity: 0 }))),
        tap(() => (this.load = false)),
      )
      .subscribe(prod => (this.products = prod));
  }

  addProduct(quantity: number, product: ProductEntity) {
    this.productSelected[product.id] = {
      quantity,
      product,
    };
  }

  createRequest() {
    this.loading = true;
    const msg = this.products
      .filter(prod => prod.quantity > 0)
      .map(({ product, quantity }) => `${product.name} : ${quantity}`)
      .join(', ');
    this.requestService.createRequest(this.id, msg).subscribe(() => {
      this.messagesService.showToastMessage('Solicitud inmediata creada exitosamente');
      this.loading = false
      this.router.navigate(['/home']);
    });
  }

  get checkQuantity() {
    return this.products.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,
      0,
    );
  }
}
