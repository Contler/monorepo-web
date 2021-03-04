import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ItemMenu } from '../interfaces/item-menu.interface';
import { AuthService } from 'hotel/services/auth.service';

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
          show: true,
        },
        {
          name: 'menu.qualification',
          icon: 'favorite',
          link: ['/home', 'statistics'],
          primary: false,
          show: true,
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
          show: true,
        },
        {
          name: 'global.ZONE',
          icon: 'room',
          outlined: false,
          link: ['/home', 'zone'],
          primary: false,
          show: true,
        },
        {
          name: 'menu.reserveAreas',
          icon: 'add_location_alt',
          outlined: false,
          link: ['/home', 'reservation'],
          primary: false,
          show: true,
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
          show: true,
        },
        {
          name: 'global.SPECIAL_REQUEST',
          icon: 'sms_failed',
          link: ['/home', 'special-requests'],
          primary: false,
          show: true,
        },
        {
          name: 'preferences.reception.name',
          icon: 'room_service',
          link: ['/home', 'reception'],
          primary: false,
          show: true,
        },
        {
          name: 'preferences.maintenance.name',
          icon: 'engineering',
          link: ['/home', 'maintenance'],
          primary: false,
          show: true,
        },
        {
          name: 'preferences.cleaning.name',
          icon: 'cleaning_services',
          link: ['/home', 'cleaning'],
          primary: false,
          show: true,
        },
        {
          name: 'preferences.room.name',
          icon: 'night_shelter',
          link: ['/home', 'request-room'],
          primary: false,
          show: true,
        },
        {
          name: 'menu.wakeUpCalls',
          icon: 'access_alarm',
          link: ['/home', 'wake-up'],
          primary: false,
          show: true,
        },
        {
          name: 'global.LATE_CHECKOUT',
          icon: 'directions_walk',
          link: ['/home', 'late'],
          primary: false,
          show: true,
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
          show: true,
        },
        {
          name: 'menu.products',
          icon: 'room_service',
          link: ['/home', 'product'],
          primary: false,
          show: true,
        },
        {
          name: 'menu.restaurant',
          icon: 'restaurant',
          link: ['/home', 'restaurant'],
          primary: false,
          show: true,
        },
        {
          name: 'menu.categories',
          icon: 'menu_book',
          link: ['/home', 'menu-category'],
          primary: false,
          show: true,
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

  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.$hotel.subscribe((hotel) => {
      this.sections = this.sections.map((section) => {
        if (section.name === 'menu.request') {
          section.children = section.children.map((child) => {
            switch (child.name) {
              case 'preferences.reception.name':
                child.show = hotel.specialZones.find((z) => z.zone.name === 'receptionZone').status;
                break;
              case 'preferences.maintenance.name':
                child.show = hotel.specialZones.find((z) => z.zone.name === 'maintainZone').status;
                break;
              case 'preferences.cleaning.name':
                child.show = hotel.specialZones.find((z) => z.zone.name === 'cleanZone').status;
                break;
              case 'menu.wakeUpCalls':
                child.show = hotel.specialZones.find((z) => z.zone.name === 'wakeZone').status;
                break;
              case 'global.LATE_CHECKOUT':
                child.show = hotel.specialZones.find((z) => z.zone.name === 'lateZone').status;
                break;
            }
            return child;
          });
        }
        if (section.name === 'menu.roomService') {
          section.children = section.children.map((child) => {
            if (child.name === 'menu.remoteOrders') {
              child.show = hotel.specialZones.find((z) => z.zone.name === 'deliveryZone').status;
            }
            return child;
          });
        }
        return section;
      });
    });
  }

  logOut() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
