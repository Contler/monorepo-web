import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ItemMenu } from '../interfaces/item-menu.interface';

@Component({
  selector: 'contler-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  sections: ItemMenu[] = [
    {
      name: 'global.GUEST',
      icon: 'account_circle',
      link: ['/home', 'guest'],
      primary: false,
      children: null,
    },
    {
      name: 'menu.team',
      icon: 'supervisor_account',
      link: null,
      primary: false,
      children: [
        {
          name: 'global.EMPLOYER',
          icon: 'account_circle',
          outlined: true,
          link: ['/home', 'employer'],
          primary: false,
        },
        {
          name: 'menu.qualification',
          icon: 'favorite',
          link: ['/home', 'statistics'],
          primary: false,
        },
      ],
    },
    {
      name: 'menu.space',
      icon: 'event',
      link: null,
      primary: false,
      children: [
        {
          name: 'menu.rooms',
          icon: 'meeting_room',
          outlined: false,
          link: ['/home', 'room'],
          primary: false,
        },
        {
          name: 'global.ZONE',
          icon: 'room',
          outlined: false,
          link: ['/home', 'zone'],
          primary: false,
        },
        {
          name: 'menu.reserveAreas',
          icon: 'add_location_alt',
          outlined: false,
          link: ['/home', 'reservation'],
          primary: false,
        },
      ],
    },
    {
      name: 'menu.request',
      icon: 'error_outline',
      link: null,
      primary: false,
      children: [
        {
          name: 'global.IMMEDIATE_REQUEST',
          icon: 'error',
          link: ['/home', 'inmediate-requests'],
          primary: true,
        },
        {
          name: 'global.SPECIAL_REQUEST',
          icon: 'sms_failed',
          link: ['/home', 'special-requests'],
          primary: false,
        },
        {
          name: 'preferences.reception.name',
          icon: 'room_service',
          link: ['/home', 'reception'],
          primary: false,
        },
        {
          name: 'preferences.maintenance.name',
          icon: 'engineering',
          link: ['/home', 'maintenance'],
          primary: false,
        },
        {
          name: 'preferences.cleaning.name',
          icon: 'cleaning_services',
          link: ['/home', 'cleaning'],
          primary: false,
        },
        {
          name: 'preferences.room.name',
          icon: 'night_shelter',
          link: ['/home', 'request-room'],
          primary: false,
        },
        {
          name: 'menu.wakeUpCalls',
          icon: 'access_alarm',
          link: ['/home', 'wake-up'],
          primary: false,
        },
        {
          name: 'global.LATE_CHECKOUT',
          icon: 'directions_walk',
          link: ['/home', 'late'],
          primary: false,
        },
      ],
    },
    {
      name: 'menu.roomService',
      icon: 'room_service',
      link: null,
      children: [
        {
          name: 'menu.remoteOrders',
          icon: 'shopping_cart',
          link: ['/home', 'order'],
          primary: false,
        },
        {
          name: 'menu.products',
          icon: 'room_service',
          link: ['/home', 'product'],
          primary: false,
        },
        {
          name: 'menu.restaurant',
          icon: 'restaurant',
          link: ['/home', 'restaurant'],
          primary: false,
        },
        {
          name: 'menu.categories',
          icon: 'menu_book',
          link: ['/home', 'menu-category'],
          primary: false,
        },
      ],
    },
    {
      name: 'menu.spaceReservations',
      icon: 'calendar_today',
      primary: false,
      link: ['/home', 'reservation', 'calendar'],
      children: null,
    },
    {
      name: 'preferences.title',
      icon: 'settings',
      primary: false,
      link: ['/preferences'],
      children: null,
    },
  ];

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  logOut() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
