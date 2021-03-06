import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, RestaurantService } from '@contler/core';
import { map, switchMap, take } from 'rxjs/operators';
import { ProductEntity } from '@contler/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { Observable } from 'rxjs';
import { CategoryModels } from '@contler/models/category.models';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as DynamicService } from '@contler/dynamic-translate';
import { AuthService } from '@contler/hotel/services/auth.service';

@Component({
  selector: 'contler-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  restaurants$: Observable<RestaurantEntity[]>;
  categories$: Observable<CategoryModels[]>;

  product!: ProductEntity;
  productForm!: FormGroup;
  load = false;
  error = '';
  compareRestaurant = (a: RestaurantEntity, b: RestaurantEntity) => a.uid === b.uid;

  constructor(
    formBuild: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public auth: AuthService,
    private restaurantService: RestaurantService,
    private translate: TranslateService,
    private dynamicTranslate: DynamicService,
  ) {
    this.route.params
      .pipe(
        map((data) => data['id']),
        switchMap((id) => this.productService.getProduct(id)),
      )
      .subscribe((product) => {
        this.product = product;
        this.productForm = formBuild.group({
          name: [dynamicTranslate.getInstant(product.name), Validators.required],
          value: [product.value, Validators.required],
          state: [product.state, Validators.required],
          description: [dynamicTranslate.getInstant(product.description), Validators.required],
          category: [product.category, Validators.required],
          restaurant: [product.restaurant, Validators.required],
        });
        this.dynamicTranslate.getTranslate([product.name, product.description]).subscribe((nTran) => {
          this.productForm.get('name').setValue(nTran[product.name]);
          this.productForm.get('description').setValue(nTran[product.description]);
        });
        if (product.restaurant) {
          this.categories$ = this.restaurantService.getCategoryRestaurant(product.restaurant.uid);
        }
      });

    this.restaurants$ = this.auth.$employer.pipe(
      take(1),
      switchMap(({ hotel }) => this.restaurantService.getAllRestaurantsByHotel(hotel.uid)),
    );
  }

  updateCategories(restaurant: RestaurantEntity) {
    this.productForm.get('category').reset();
    this.categories$ = this.restaurantService.getCategoryRestaurant(restaurant.uid);
  }

  updateProduct() {
    this.error = '';
    this.load = true;
    const { name, description } = this.productForm.value;
    this.dynamicTranslate.updateTranslate(this.product.name, name, this.product.hotel.uid).subscribe();
    this.dynamicTranslate
      .updateTranslate(this.product.description, description, this.product.hotel.uid)
      .subscribe();
    this.productService.updateProduct(this.product).subscribe(() => {
      this.load = false;
      this.router.navigate(['home/product']);
    });
  }

  deleteProduct() {
    this.load = true;
    this.error = '';
    this.productService.deleteProduct(this.product.id).subscribe(
      () => {
        this.router.navigate(['home/product']);
      },
      () => {
        this.load = false;
        this.error = this.translate.instant('product.errorDelete');
      },
    );
  }
}
