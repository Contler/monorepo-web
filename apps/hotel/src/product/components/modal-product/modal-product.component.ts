import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CATEGORY_PRODUCTS } from '@contler/const';
import { ProductService } from '@contler/core';
import { AuthService } from 'hotel/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  categories = CATEGORY_PRODUCTS;
  loading = false;
  product = {
    name: '',
    value: 0,
    description: '',
  };
  private sc1: Subscription | undefined;
  private sc2: Subscription | undefined;
  private sc3: Subscription | undefined;

  constructor(
    formBuild: FormBuilder,
    public dialogRef: MatDialogRef<ModalProductComponent>,
    private productService: ProductService,
    private auth: AuthService,
  ) {
    this.productForm = formBuild.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.sc1 = this.nameControl.valueChanges.subscribe(data => (this.product = { ...this.product, name: data }));
    this.sc2 = this.valueControl.valueChanges.subscribe(data => (this.product = { ...this.product, value: data }));
    this.sc3 = this.descriptionControl.valueChanges.subscribe(data => (this.product = { ...this.product, description: data }));
  }

  ngOnDestroy(): void {
    this.sc1!.unsubscribe();
    this.sc2!.unsubscribe();
    this.sc3!.unsubscribe();
  }

  createProduct() {
    this.loading = true;
    this.auth.$employer
      .pipe(
        switchMap(user =>
          this.productService.createProduct({
            hotelId: user.hotel.uid,
            ...this.productForm.value,
          }),
        ),
      )
      .subscribe(product => {
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
