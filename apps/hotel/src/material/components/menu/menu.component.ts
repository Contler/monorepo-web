import { Component, OnInit } from '@angular/core';
import { HotelService } from '@contler/core';
import { Observable } from 'rxjs';
import { Hotel } from '@contler/models';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ItemMenu } from '../interfaces/item-menu.interface';

@Component({
  selector: 'contler-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  $hotel: Observable<Hotel>;
  sections: ItemMenu[] = [
    {
      name: 'Huespedes',
      icon: 'account_circle',
      link: ['/home', 'guest'],
      primary: false,
      children: null,
    },
    {
      name: 'Equipo',
      icon: 'supervisor_account',
      link: null,
      primary: false,
      children: [
        {
          name: 'Empleados',
          icon: 'account_circle',
          outlined: true,
          link: ['/home', 'employer'],
          primary: false,
        },
        {
          name: 'Calificaciones',
          icon: 'favorite',
          link: ['/home', 'statistics'],
          primary: false,
        },
      ],
    },
    {
      name: 'Espacios',
      icon: 'event',
      link: null,
      primary: false,
      children: [
        {
          name: 'Habitaciones',
          icon: 'meeting_room',
          outlined: false,
          link: ['/home', 'room'],
          primary: false,
        },
        {
          name: 'Zonas',
          icon: 'room',
          outlined: false,
          link: ['/home', 'zone'],
          primary: false,
        },
        {
          name: 'Zonas de reserva',
          icon: 'add_location_alt',
          outlined: false,
          link: ['/home', 'reservation'],
          primary: false,
        },
      ],
    },
    {
      name: 'Solicitudes',
      icon: 'error_outline',
      link: null,
      primary: false,
      children: [
        {
          name: 'Solicitudes inmediatas',
          icon: 'error',
          link: ['/home', 'inmediate-requests'],
          primary: true,
        },
        {
          name: 'Solicitudes especiales',
          icon: 'sms_failed',
          link: ['/home', 'special-requests'],
          primary: false,
        },
        {
          name: 'Wake up calls',
          icon: 'access_alarm',
          link: ['/home', 'wake-up'],
          primary: false,
        },
        {
          name: 'Late Checkouts',
          icon: 'directions_walk',
          link: ['/home', 'late'],
          primary: false,
        },
      ],
    },
    {
      name: 'Room Service',
      icon: 'room_service',
      link: null,
      children: [
        {
          name: 'Pedidos remotos',
          icon: 'shopping_cart',
          link: ['/home', 'order'],
          primary: false,
        },
        {
          name: 'Productos',
          icon: 'room_service',
          link: ['/home', 'product'],
          primary: false,
        },
        {
          name: 'Restaurante',
          icon: 'restaurant',
          link: ['/home', 'restaurant'],
          primary: false,
        },
        {
          name: 'Categorias de Menú',
          icon: 'menu_book',
          link: ['/home', 'menu-category'],
          primary: false,
        },
      ],
    },
    {
      name: 'Reservas de espacios',
      icon: 'calendar_today',
      primary: false,
      link: ['/home', 'reservation', 'calendar'],
      children: null,
    },
  ];

  constructor(private hotelService: HotelService, private afAuth: AngularFireAuth, private router: Router) {
    this.$hotel = this.hotelService.getHotel();
  }

  ngOnInit() {}

  logOut() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
