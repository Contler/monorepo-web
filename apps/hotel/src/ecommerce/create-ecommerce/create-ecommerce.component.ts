import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '@contler/hotel/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EcommerceService } from '@contler/hotel/ecommerce/services/ecommerce.service';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { CategoryEcommerceEntity } from '@contler/entity/category-ecommerce.entity';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@contler/hotel/services/messages/messages.service';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@contler/dynamic-translate';
import { throwError } from 'rxjs';
import { ProductEcommerceEntity } from '@contler/entity/product-ecommerce.entity';

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
  ecommerce: EcommerceEntity = null;
  private isUpdateEcommerce = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private ecommerceService: EcommerceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messagesService: MessagesService,
    private translateService: TranslateService,
  ) {
    this.formEcommerce = this.createFormEcommerce();
    this.formCategory = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
    this.formProduct = this.formBuilder.group({
      id: new FormControl('', Validators.nullValidator),
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
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((ecommerceId) => !!ecommerceId),
        switchMap((ecommerceId) => this.ecommerceService.getEcommerceById(ecommerceId)),
        tap((ecommerce) => (this.ecommerce = ecommerce)),
        switchMap((ecommerce) => {
          if (!ecommerce) {
            this.router.navigate(['preferences', 'ecommerce']);
            return throwError('ecommerce no found');
          }
          const categoriesName = ecommerce.categories.map((c) => c.name);
          const productsName = [];
          ecommerce.categories.forEach((c) => c.products.forEach((p) => productsName.push(p.name)));
          return this.translateService.getTranslate([
            ecommerce.title,
            ecommerce.description,
            ...categoriesName,
            ...productsName,
          ]);
        }),
      )
      .subscribe((ecommerceTranslateKeys) => {
        this.ecommerce.title = ecommerceTranslateKeys[this.ecommerce.title];
        this.ecommerce.description = ecommerceTranslateKeys[this.ecommerce.description];
        this.ecommerce.categories = this.ecommerce.categories.map((category) => {
          category.name = ecommerceTranslateKeys[category.name];
          this.addCategory(category);
          category.products = this.setProductsWithTranslate(
            category.products,
            ecommerceTranslateKeys,
            category.name,
          );
          return category;
        });
        this.formEcommerce.patchValue(this.ecommerce);
        this.isUpdateEcommerce = true;
      });
  }

  goToHome(): void {
    if (this.formEcommerce.valid) {
      const products: ProductEcommerceEntity[] = this.products.value;
      const categories: CategoryEcommerceEntity[] = this.categories.value;
      const { title, description } = this.formEcommerce.value;
      if (this.isUpdateEcommerce) {
        this.updateEcommerce(title, description);
        return;
      }
      this.createEcommerce(title, description, categories, products);
    }
  }

  addCategory(initialCategory: CategoryEcommerceEntity): void {
    const categoryControl = this.formBuilder.group({
      id: new FormControl('', Validators.nullValidator),
      name: new FormControl('', Validators.required),
    });
    categoryControl.patchValue(initialCategory);
    if (this.isUpdateEcommerce) {
      this.addCategoryToEcommerce(categoryControl);
    }
    this.categories.push(categoryControl);
    this.formCategory.reset();
  }

  addProduct(initialProduct: ProductEcommerceEntity): void {
    const productControl = this.formBuilder.group({
      id: new FormControl(null, Validators.nullValidator),
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.nullValidator),
    });
    productControl.patchValue(initialProduct);
    if (this.isUpdateEcommerce && !initialProduct.id) {
      this.addProductToEcommerce(productControl);
    }
    this.products.push(productControl);
    this.formProduct.reset({ status: true });
  }

  removeCategory(categoryIndex: number): void {
    const category = this.categories.at(categoryIndex).value;
    const products = this.products.value;
    const categoryInUse = products.find((product) => product.category === category.name);
    if (!categoryInUse && category.id) {
      this.removeCategoryFromEcommerce(categoryIndex, category);
    } else if (!categoryInUse && !category.id) {
      this.categories.removeAt(categoryIndex);
    } else {
      this.messagesService.showToastMessageTranslate('global.ECOMMERCE.cannotRemoveCategory');
    }
  }

  removeProduct(ecommerceId: string, productIndex: number): void {
    const product = this.products.at(productIndex);
    if (product.value.id) {
      this.removeProductFromEcommerce(productIndex, ecommerceId, product.value.id);
    } else {
      this.products.removeAt(productIndex);
    }
  }

  onEditProduct(productIndex: number): void {
    this.formProduct.patchValue(this.products.at(productIndex).value);
    this.updateProductIndex = productIndex;
  }

  updateProduct(updateProductIndex: number): void {
    this.products.at(updateProductIndex).patchValue(this.formProduct.value);
    const { id } = this.formProduct.value;
    if (id) {
      const { category } = this.formProduct.value;
      this.updateProductFromEcommerce(category);
    }
    this.updateProductIndex = null;
    this.formProduct.reset();
  }

  toggleProductStatus($event: MatSlideToggleChange, productControlIndex: number): void {
    const product = this.products.at(productControlIndex);
    product.patchValue({ status: $event.checked });
    if (product.value.id) {
      const productUpdate = Object.assign({}, product.value);
      delete productUpdate.category;
      const loader = this.messagesService.showLoader();
      this.ecommerceService.updateProduct(this.ecommerce.id, productUpdate, this.hotel.uid).subscribe(
        () => {
          this.messagesService.closeLoader(loader);
        },
        () => {
          this.messagesService.closeLoader(loader);
          this.messagesService.showServerError();
        },
      );
    }
  }

  private createFormEcommerce(): FormGroup {
    return this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      categories: new FormArray([]),
      products: new FormArray([]),
    });
  }

  private goToBack(): void {
    this.router.navigate(['preferences', 'ecommerce']).then(() => {
      this.authService.reloadUser();
    });
  }

  private setProductsWithTranslate(
    products: ProductEcommerceEntity[],
    ecommerceTranslateKeys: { [key: string]: string },
    categoryName: string,
  ): ProductEcommerceEntity[] {
    return products.map((product) => {
      product.name = ecommerceTranslateKeys[product.name];
      this.addProduct({
        id: product.id,
        category: categoryName,
        name: product.name,
        price: product.price,
        status: product.status,
      });
      return product;
    });
  }

  private updateEcommerce(title: string, description: string): void {
    const loader = this.messagesService.showLoader();
    this.ecommerce.title = title;
    this.ecommerce.description = description;
    this.ecommerceService.updateCommerce(this.ecommerce).subscribe(
      () => {
        this.messagesService.closeLoader(loader);
        this.goToBack();
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }

  private createEcommerce(
    title: string,
    description: string,
    categories: CategoryEcommerceEntity[],
    products: ProductEcommerceEntity[],
  ): void {
    const loader = this.messagesService.showLoader();
    const ecommerce: EcommerceEntity = {
      id: null,
      status: true,
      title,
      description,
      hotel: this.hotel,
      categories: null,
    };
    this.ecommerceService.createEcommerce(ecommerce, categories, products).subscribe(
      () => {
        this.messagesService.closeLoader(loader);
        this.goToBack();
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }

  private addCategoryToEcommerce(categoryControl: FormGroup): void {
    const category = Object.assign({}, categoryControl.value);
    category.ecommerce = this.ecommerce;
    const loader = this.messagesService.showLoader();
    this.ecommerceService.createCategory(category).subscribe(
      async (categoryAdded) => {
        categoryAdded.name = await this.translateService
          .getTranslate(categoryAdded.name)
          .pipe(first())
          .toPromise();
        categoryControl.patchValue(categoryAdded);
        this.messagesService.closeLoader(loader);
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }

  private addProductToEcommerce(productControl: FormGroup): void {
    const loader = this.messagesService.showLoader();
    const productInserted = productControl.value;
    const categoryName = productInserted.category;
    const categories = this.categories.value;
    productInserted.category = categories.find((category) => category.name === categoryName);
    this.ecommerceService.createProduct(this.ecommerce.id, productInserted).subscribe(
      async (productAdded) => {
        productAdded.name = await this.translateService
          .getTranslate(productAdded.name)
          .pipe(first())
          .toPromise();
        productAdded.category = categoryName;
        productControl.patchValue(productAdded);
        this.messagesService.closeLoader(loader);
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }

  private removeCategoryFromEcommerce(categoryIndex: number, category: CategoryEcommerceEntity): void {
    const loader = this.messagesService.showLoader();
    this.ecommerceService.removeCategory(category.id, this.ecommerce.id).subscribe(
      () => {
        this.categories.removeAt(categoryIndex);
        this.messagesService.closeLoader(loader);
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }

  private removeProductFromEcommerce(productIndex: number, ecommerceId: string, productId: string): void {
    const loader = this.messagesService.showLoader();
    this.ecommerceService.removeProduct(ecommerceId, productId).subscribe(
      (response) => {
        this.messagesService.closeLoader(loader);
        if (!response.orderProduct.length) {
          this.products.removeAt(productIndex);
        } else {
          this.messagesService.showToastMessageTranslate(
            'global.ECOMMERCE.cannotRemoveProduct',
            'global.CLOSE',
            6000,
          );
        }
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }

  private updateProductFromEcommerce(categoryName: string): void {
    const categoryFound = this.categories.value.find((c) => c.name === categoryName);
    const product = Object.assign({}, this.formProduct.value);
    product.category = categoryFound;
    const loader = this.messagesService.showLoader();
    this.ecommerceService.updateProduct(this.ecommerce.id, product, this.hotel.uid).subscribe(
      () => {
        this.messagesService.closeLoader(loader);
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }
}
