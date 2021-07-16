import { Component, OnInit } from '@angular/core';
import { HotelEntity, ProductEntity } from '@contler/entity';
import { AuthService } from '@contler/hotel/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EcommerceService } from '@contler/hotel/ecommerce/services/ecommerce.service';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { CategoryEcommerceEntity } from '@contler/entity/category-ecommerce.entity';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MessagesService } from '@contler/hotel/services/messages/messages.service';

@Component({
  selector: 'contler-create-ecommerce',
  templateUrl: './create-ecommerce.component.html',
  styleUrls: ['./create-ecommerce.component.scss'],
})
export class CreateEcommerceComponent implements OnInit {
  formCategory: FormGroup;
  formProduct: FormGroup;
  hotel: HotelEntity;
  formEcommerce: FormGroup;
  updateProductIndex: number | null = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private ecommerceService: EcommerceService,
    private router: Router,
    private messagesService: MessagesService,
  ) {
    this.formEcommerce = this.createFormEcommerce();
    this.formCategory = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
    this.formProduct = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      status: new FormControl(true, Validators.nullValidator),
    });
  }

  get categories(): FormArray {
    return this.formEcommerce.get('categories') as FormArray;
  }

  get products(): FormArray {
    return this.formEcommerce.get('products') as FormArray;
  }

  ngOnInit(): void {
    this.authService.$hotel.subscribe((hotel) => {
      this.hotel = hotel;
    });
  }

  goToHome(): void {
    if (this.formEcommerce.valid) {
      const products: ProductEntity[] = this.products.value;
      const categories: CategoryEcommerceEntity[] = this.categories.value;

      const { title, description } = this.formEcommerce.value;
      const ecommerce: EcommerceEntity = {
        id: null,
        status: true,
        title,
        description,
        hotel: this.hotel,
        categories: null,
      };
      const loader = this.messagesService.showLoader();
      this.ecommerceService.createEcommerce(ecommerce, categories, products).subscribe(
        () => {
          this.router.navigate(['preferences', 'ecommerce']).then(() => {
            this.authService.reloadUser();
            this.messagesService.closeLoader(loader);
          });
        },
        () => {
          this.messagesService.closeLoader(loader);
          this.messagesService.showServerError();
        },
      );
    }
  }

  addCategory(): void {
    const categoryControl = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
    categoryControl.setValue(this.formCategory.value);
    this.categories.push(categoryControl);
    this.formCategory.reset();
  }

  addProduct(): void {
    const productControl = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      status: new FormControl(true, Validators.nullValidator),
    });
    productControl.patchValue(this.formProduct.value);
    this.products.push(productControl);
    this.formProduct.reset({
      status: true,
    });
  }

  public removeCategory(index: number): void {
    const category = this.categories.at(index).value;
    const products = this.products.value;
    const categoryInUse = products.find((product) => product.category === category);
    if (!categoryInUse) {
      this.categories.removeAt(index);
    }
  }

  public removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  public onEditProduct(index: number): void {
    this.formProduct.patchValue(this.products.at(index).value);
    this.updateProductIndex = index;
  }

  public updateProduct(updateProductIndex: number): void {
    this.products.at(updateProductIndex).patchValue(this.formProduct.value);
    this.updateProductIndex = null;
    this.formProduct.reset();
  }

  public toggleProductStatus($event: MatSlideToggleChange, productControlIndex: number): void {
    this.products.at(productControlIndex).setValue($event.checked);
  }

  private createFormEcommerce(): FormGroup {
    return this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      categories: new FormArray([]),
      products: new FormArray([]),
    });
  }
}
