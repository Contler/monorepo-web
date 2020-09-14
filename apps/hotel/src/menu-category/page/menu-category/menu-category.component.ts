import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { AuthService } from 'hotel/services/auth.service';
import { Observable } from 'rxjs';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { RestaurantService } from '@contler/core';
import { switchMap, take, tap } from 'rxjs/operators';
import { CategoryModels } from '@contler/models/category.models';

@Component({
  selector: 'contler-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss'],
})
export class MenuCategoryComponent implements OnInit {
  restaurants$: Observable<RestaurantEntity[]>;
  categories: { [key: string]: Observable<CategoryModels[]> } = {};

  menuCategoryForm: FormGroup;
  load = false;
  panelOpenState = false;
  hotelId: string = null;

  constructor(
    private formBuild: FormBuilder,
    public dialog: MatDialog,
    private messagesService: MessagesService,
    private authServ: AuthService,
    private restaurantServ: RestaurantService,
  ) {
    this.menuCategoryForm = formBuild.group({
      name: [null, Validators.required],
      restaurant: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.restaurants$ = this.authServ.$employer.pipe(
      take(1),
      switchMap((usr) => this.restaurantServ.getAllRestaurantsByHotel(usr.hotel.uid)),
      tap(this.loadCategories.bind(this)),
    );
  }

  save() {
    if (this.menuCategoryForm.valid) {
      this.load = true;
      const { name, restaurant } = this.menuCategoryForm.value;
      this.restaurantServ
        .createCategoryRestaurant(restaurant.uid, name)
        .then(() => {
          this.load = false;
          this.messagesService.showToastMessage('Restaurante creado exitosamente');
          this.resetForm();
        })
        .catch(() => {
          this.messagesService.showServerError();
        });
    }
  }

  resetForm() {
    this.menuCategoryForm.markAsPristine();
    this.menuCategoryForm.markAsUntouched();
    this.menuCategoryForm.reset();
  }

  private loadCategories(restaurants: RestaurantEntity[]) {
    restaurants.forEach(({ uid }) => {
      this.categories[uid] = this.restaurantServ.getCategoryRestaurant(uid);
    });
  }
}
