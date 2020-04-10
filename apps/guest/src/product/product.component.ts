import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'guest/services/general.service';
import { CATEGORY_PRODUCTS } from '@contler/const';
import { GuestService } from 'guest/services/guest.service';
import { ProductService } from '@contler/core';
import { switchMap, take } from 'rxjs/operators';
import { ObjectCategoryProduct, ProductListModel } from '@contler/models/product-list-model';
import { ProductOrderService } from 'guest/product/services/product-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  actualCategory = CATEGORY_PRODUCTS[0];

  categories = [
    {
      category: CATEGORY_PRODUCTS[0],
      icon: 'local_bar',
    },
    {
      category: CATEGORY_PRODUCTS[1],
      icon: 'restaurant',
    },
    {
      category: CATEGORY_PRODUCTS[2],
      icon: 'room_service',
    },
  ];

  productCategories: ObjectCategoryProduct = {};
  error = '';

  constructor(
    public general: GeneralService,
    private guestService: GuestService,
    private productService: ProductService,
    private productOrderService: ProductOrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.guestService.$hotel
      .pipe(
        take(1),
        switchMap(hotel => this.productService.getAllProducts(hotel!.uid)),
      )
      .subscribe(products => {
        products.forEach(product => {
          if (!this.productCategories[product.category]) {
            this.productCategories[product.category] = {
              category: product.category,
              productList: [],
            };
          }
          this.productCategories[product.category].productList = [
            ...this.productCategories[product.category].productList,
            { product, quantity: 0 },
          ];
        });
      });
  }

  selectCategory(category: string) {
    this.actualCategory = category;
  }

  isSelect(index: number) {
    return this.actualCategory === CATEGORY_PRODUCTS[index];
  }

  nextStep() {
    this.error = '';
    let totalProducts: ProductListModel[] = [];
    Object.values(this.productCategories).forEach(data => {
      totalProducts = [
        ...totalProducts,
        ...data.productList.filter(product => product.quantity > 0),
      ];
    });
    if (totalProducts.length) {
      this.productOrderService.saveOrder(totalProducts);
      this.router.navigate(['/home/product/order'])
    } else {
      this.error = 'Debes seleccionar al menos un producto'
    }
  }
}
