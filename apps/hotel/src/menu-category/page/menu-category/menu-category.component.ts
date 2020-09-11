import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { AuthService } from 'hotel/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { RestaurantService } from '@contler/core';

@Component({
  selector: 'contler-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss'],
})
export class MenuCategoryComponent implements OnInit, OnDestroy {
  menuCategoryForm: FormGroup;
  categoriesMenu: any[] = [
    {
      restaurant: 'Plaza norte',
      categories: [{ name: 'categoria 1' }, { name: 'categoria 2' }, { name: 'categoria 3' }],
    },
    {
      restaurant: 'Plaza sur',
      categories: [
        { name: 'categoria sur 1' },
        { name: 'categoria sur 2' },
        { name: 'categoria sur 3' },
      ],
    },
  ];
  restaurants: Observable<RestaurantEntity[]>;
  load = false;
  hotelId: string = null;
  subscription: Subscription[] = [];

  constructor(
    private formBuild: FormBuilder,
    public dialog: MatDialog,
    private messagesService: MessagesService,
    private authServ: AuthService,
    private restaurantServ: RestaurantService,
  ) {
    this.menuCategoryForm = formBuild.group({
      category: [null, Validators.required],
      restaurant: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription.push(
      this.authServ.$employer.subscribe((user) => {
        this.hotelId = user.hotel.uid;
        this.getRestaurants();
        // this.getmenuCategories();
      }),
    );
  }

  save() {
    if (this.menuCategoryForm.valid) {
      console.log('formulario: ', this.menuCategoryForm.value);
    }
  }

  resetForm() {
    this.menuCategoryForm.markAsPristine();
    this.menuCategoryForm.markAsUntouched();
    this.menuCategoryForm.reset();
  }

  getmenuCategories() {}

  getRestaurants() {
    this.subscription.push(
      this.restaurantServ.getAllRestaurantsByHotel(this.hotelId).subscribe((restaurant: any) => {
        if (restaurant) {
          this.restaurants = restaurant ? restaurant : [];
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }
}
