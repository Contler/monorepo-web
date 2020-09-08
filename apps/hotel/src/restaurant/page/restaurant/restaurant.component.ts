import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RestaurantService } from '../../../../../../libs/core/src/lib/services/restaurant/restaurant.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { AuthService } from 'hotel/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'contler-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
  restaurantGroup: FormGroup;
  restaurantArray: FormArray;
  load = false;
  restaurants: RestaurantEntity[] = [];

  dataSource: any;
  displayedColumns: string[] = ['name', 'actions'];
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  pageIndex: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  hotelId: string = null;
  subscription: Subscription[] = [];

  constructor(
    private formBuild: FormBuilder,
    private restaurantServ: RestaurantService,
    private messagesService: MessagesService,
    private authServ: AuthService,
    public dialog: MatDialog,
  ) {
    this.restaurantGroup = formBuild.group({
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription.push(
      this.authServ.$employer.subscribe((user) => {
        this.hotelId = user.hotel.uid;
        this.getRestaurants();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }

  save() {
    this.load = true;
    const { name } = this.restaurantGroup.value;
    this.restaurantServ.createRestaurant(name, this.hotelId).subscribe(
      (restaurant) => {
        this.dataSource.data = [...this.dataSource.data, restaurant].sort((a: any, b: any) =>
          a.name.localeCompare(b.name),
        );
        this.load = false;
        this.messagesService.showToastMessage('Restaurante creado exitosamente');
        this.resetForm();
      },
      () => {
        this.load = false;
        this.messagesService.showServerError();
      },
    );
  }

  resetForm() {
    this.restaurantGroup.markAsPristine();
    this.restaurantGroup.markAsUntouched();
    this.restaurantGroup.reset();
  }

  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  updateField(index: number, field: string, restId: string) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.restaurantServ.updateNameRestaurant(restId, control.value).subscribe(() => {
        this.getRestaurants();
        this.messagesService.showToastMessage('Restaurante actualizado exitosamente');
      });
    }
  }

  getControl(index: number, fieldName: string) {
    const a = this.restaurantArray.at(index).get(fieldName) as FormControl;
    return this.restaurantArray.at(index).get(fieldName) as FormControl;
  }

  deleteRest(restaurant: RestaurantEntity) {
    this.restaurantServ.deleteRestaurant(restaurant.uid).subscribe(
      () => {
        this.getRestaurants();
        this.messagesService.showToastMessage('Restaurante eliminado exitosamente');
      },
      (err) => {
        if (err.error.statusCode === 400) {
          this.messagesService.showServerError(err, err.error.message);
        } else {
          this.messagesService.showServerError();
        }
      },
    );
  }

  getRestaurants() {
    this.restaurantServ.getAllRestaurantsByHotel(this.hotelId).subscribe((restaurants: any) => {
      if (restaurants.length > 0) {
        this.dataSource = new MatTableDataSource<Element>(restaurants);
        this.dataSource.data.sort((a: any, b: any) => a.name.localeCompare(b.name));
        this.dataSource.paginator = this.paginator;
        const groupRestaurant = restaurants.map((rest: any) => {
          return new FormGroup({
            name: new FormControl(rest.name, Validators.required),
            uid: new FormControl(rest.uid),
          });
        });

        this.restaurantArray = new FormArray(groupRestaurant);
        this.totalSize = this.restaurantArray.length;
      }
    });
  }
}
