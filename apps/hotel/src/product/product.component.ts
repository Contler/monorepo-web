import { Component, OnInit } from '@angular/core';
import { ModalProductComponent } from '@contler/hotel/product/components/modal-product/modal-product.component';
import { HotelEntity, ProductEntity } from '@contler/entity';
import { filter, switchMap, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@contler/hotel/services/auth.service';
import { ProductService } from '@contler/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  dataSource = new MatTableDataSource<ProductEntity>();
  displayedColumns: string[] = ['name', 'description', 'value', 'restaurant', 'state'];
  readonly filters = [
    { name: 'product.all', value: 0 },
    { name: 'product.active', value: 1 },
    { name: 'product.inactive ', value: 2 },
  ];
  filter = 0;
  private products: ProductEntity[] = [];
  hotel$: Observable<HotelEntity>;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.hotel$ = this.auth.$hotel;
    this.getAllProducts();
  }

  changeProductState(event: number) {
    if (event === 0) {
      this.getAllProducts();
    } else if (event === 1) {
      this.getActiveProduct();
    } else {
      this.getInactiveProduct();
    }
  }

  textFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllProducts() {
    this.auth.$employer
      .pipe(switchMap((user) => this.productService.getAllProducts(user.hotel.uid)))
      .subscribe((products) => {
        this.products = products;
        this.dataSource.data = products;
      });
  }

  getActiveProduct() {
    this.dataSource.data = this.products.filter((item) => {
      return item.state === true;
    });
  }

  getInactiveProduct() {
    this.dataSource.data = this.products.filter((item) => {
      return item.state === false;
    });
  }

  openCreateProductModel() {
    this.dialog
      .open(ModalProductComponent, {
        disableClose: true,
        width: '500px',
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((data) => !!data),
      )
      .subscribe((data) => (this.dataSource.data = [...this.dataSource.data, data]));
  }

  goToProduct(product: ProductEntity) {
    this.router.navigate(['home/product', product.id]);
  }
}
