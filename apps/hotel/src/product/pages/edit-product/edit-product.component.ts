import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@contler/core';
import { map, switchMap } from 'rxjs/operators';
import { ProductEntity } from '@contler/entity';
import { CATEGORY_PRODUCTS } from '@contler/const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contler-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  product!: ProductEntity;
  categories = CATEGORY_PRODUCTS;
  productForm!: FormGroup;
  load = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    formBuild: FormBuilder,
  ) {
    this.route.params
      .pipe(
        map(data => data['id']),
        switchMap(id => this.productService.getProduct(id)),
      )
      .subscribe(product => {
        this.product = product;
        this.productForm = formBuild.group({
          name: [product.name, Validators.required],
          value: [product.value, Validators.required],
          state: [product.state, Validators.required],
          description: [product.description, Validators.required],
          category: [product.category, Validators.required],
        });
      });
  }

  updateProduct() {
    this.error = '';
    this.load = true;
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
        this.error = 'No se puede borrar el producto';
      },
    );
  }
}
