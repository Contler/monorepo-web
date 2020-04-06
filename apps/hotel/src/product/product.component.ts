import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalProductComponent } from 'hotel/product/components/modal-product/modal-product.component';
import { ProductEntity } from '@contler/entity';
import { filter, switchMap, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'hotel/services/auth.service';
import { ProductService } from '@contler/core';

@Component({
  selector: 'contler-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  dataSource = new MatTableDataSource<ProductEntity>();
  displayedColumns: string[] = ['name', 'description', 'value', 'category', 'state'];

  constructor(private dialog: MatDialog, private auth: AuthService, private productService: ProductService) {}

  ngOnInit() {
    this.auth.$employer
      .pipe(switchMap(user => this.productService.getAllProducts(user.hotel.uid)))
      .subscribe(products => (this.dataSource.data = products));
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
        filter(data => !!data),
      )
      .subscribe(data => (this.dataSource.data = [...this.dataSource.data, data]));
  }
}
