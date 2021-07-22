import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { EcommerceService } from 'lib/lib/services/ecommerce/ecommerce.service';
import { Observable } from 'rxjs';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from 'guest/app/reducers';
import { Store } from '@ngrx/store';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';
import { MessagesService } from 'guest/services/messages/messages.service';

@Component({
  selector: 'contler-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
})
export class EcommerceComponent implements OnInit {
  ecommerce$: Observable<EcommerceEntity>;
  orderForm: FormGroup;
  quantityProducts = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ecommerceService: EcommerceService,
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private messagesService: MessagesService,
    private router: Router,
  ) {
    this.orderForm = this.formBuilder.group({
      order: new FormArray([]),
    });
  }

  get orders(): FormArray {
    return this.orderForm.get('order') as FormArray;
  }

  ngOnInit(): void {
    this.ecommerce$ = this.activatedRoute.paramMap.pipe(
      filter((params) => params.has('id')),
      map((params) => params.get('id')),
      switchMap((ecommerceUid) => this.ecommerceService.getEcommerceById(ecommerceUid)),
      tap((ecommerce) => this.generateFormOrder(ecommerce)),
    );
  }

  decreaseQuantity(productControl: AbstractControl): void {
    const val = productControl.get('quantity').value;
    if (val >= 1) {
      productControl.get('quantity').setValue(val - 1);
    }
    if (this.quantityProducts >= 1) {
      this.quantityProducts--;
    }
  }

  increaseQuantity(productControl: AbstractControl): void {
    const val = productControl.get('quantity').value;
    productControl.get('quantity').setValue(val + 1);
    this.quantityProducts++;
  }

  public onMakeOrder(ecommerce: EcommerceEntity): void {
    const loader = this.messagesService.showLoader();
    this.store
      .pipe(selectUserState)
      .pipe(
        first(),
        switchMap(({ user, hotel }) => {
          const {
            order: { value },
          } = this.orderForm.controls;
          const orders = value.filter((o) => o.quantity);
          ecommerce.categories = null;
          ecommerce.hotel = null;
          return this.ecommerceService.createOrder({ guest: user, hotel, orders, ecommerce });
        }),
      )
      .subscribe(
        (response) => {
          this.messagesService.closeLoader(loader);
          this.router.navigate(['/']);
        },
        (err) => {
          this.messagesService.closeLoader(loader);
          this.messagesService.showServerError();
        },
      );
  }

  private generateFormOrder(ecommerce: EcommerceEntity): void {
    const { categories } = ecommerce;
    const productsArr = [];
    for (const category of categories) {
      const { products } = category;
      productsArr.push(
        ...products.map((p) => {
          return {
            ...p,
            category,
          };
        }),
      );
    }
    for (const product of productsArr) {
      const productControl = this.formBuilder.group({
        product: product,
        categoryId: product.category.id,
        quantity: new FormControl(0, Validators.required),
      });
      this.orders.push(productControl);
    }
  }
}
