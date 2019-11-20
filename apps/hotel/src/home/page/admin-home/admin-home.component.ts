import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contler-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  sections = [
    {
      name: 'Empleados',
      icon: 'account_circle',
      outlined: true
    },
    {
      name: 'Habitaciones',
      icon: 'meeting_room',
      outlined: false
    },
    {
      name: 'Zonas',
      icon: 'room',
      outlined: false
    },
    {
      name: 'Solicitudes inmediatas',
      icon: 'error',
      outlined: false,
      primary: true
    },
    {
      name: 'Reservas de espacios',
      icon: 'event',
      outlined: false
    },
    {
      name: 'Pedidos Remotos',
      icon: 'room_service',
      outlined: false
    },
    {
      name: 'Wake up Calls',
      icon: 'access_alarm',
      outlined: false
    },
    {
      name: 'Late Checkouts',
      icon: 'directions_walk',
      outlined: false
    },
    {
      name: 'Solicitudes Especiales',
      icon: 'sms_failed',
      outlined: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
