import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CATEGORY_PRODUCTS } from '@contler/const';
import { ProductService, RestaurantService } from '@contler/core';
import { AuthService } from '@contler/hotel/services/auth.service';
import { switchMap, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { CategoryModels } from '@contler/models/category.models';
import { ProductEntity } from '@contler/entity';

@Component({
  selector: 'contler-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit, OnDestroy {
  restaurants$: Observable<RestaurantEntity[]>;
  categories$: Observable<CategoryModels[]>;

  productForm: FormGroup;
  loading = false;
  product: ProductEntity = {
    name: '',
    value: 0,
    description: '',
    hotel: null,
    id: null,
    category: null,
    restaurant: null,
    state: null,
  };
  private sc1: Subscription | undefined;
  private sc2: Subscription | undefined;
  private sc3: Subscription | undefined;

  constructor(
    formBuild: FormBuilder,
    public dialogRef: MatDialogRef<ModalProductComponent>,
    private productService: ProductService,
    private auth: AuthService,
    private restaurantService: RestaurantService,
  ) {
    this.productForm = formBuild.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
      restaurant: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.sc1 = this.nameControl.valueChanges.subscribe(
      (data) => (this.product = { ...this.product, name: data }),
    );
    this.sc2 = this.valueControl.valueChanges.subscribe(
      (data) => (this.product = { ...this.product, value: data }),
    );
    this.sc3 = this.descriptionControl.valueChanges.subscribe(
      (data) => (this.product = { ...this.product, description: data }),
    );
    this.restaurants$ = this.auth.$employer.pipe(
      take(1),
      switchMap(({ hotel }) => this.restaurantService.getAllRestaurantsByHotel(hotel.uid)),
    );
  }

  ngOnDestroy(): void {
    this.sc1!.unsubscribe();
    this.sc2!.unsubscribe();
    this.sc3!.unsubscribe();
  }

  updateCategories(restaurant: RestaurantEntity) {
    this.productForm.get('category').reset();
    this.categories$ = this.restaurantService.getCategoryRestaurant(restaurant.uid);
  }

  createProduct() {
    this.loading = true;
    this.auth.$employer
      .pipe(
        take(1),
        switchMap((user) =>
          this.productService.createProduct({
            hotelId: user.hotel.uid,
            ...this.productForm.value,
          }),
        ),
      )
      .subscribe((product) => {
        this.loading = false;
        this.dialogRef.close(product);
      });
  }

  get nameControl() {
    return this.productForm.get('name')!;
  }

  get valueControl() {
    return this.productForm.get('value')!;
  }

  get descriptionControl() {
    return this.productForm.get('description')!;
  }
}
