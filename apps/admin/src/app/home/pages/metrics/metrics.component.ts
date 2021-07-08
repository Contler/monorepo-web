import { Component, OnInit } from '@angular/core';
import { HotelService } from '@contler/core';
import { HotelEntity } from '@contler/entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  hotels$: Observable<HotelEntity[]>;
  hotelId: string;
  since: Date;
  until: Date;

  metrics = [
    {
      name: 'Cantidad de huéspedes por hotel',
      id: 0,
    },
    {
      name: 'Tiempo en crear una solicitud',
      id: 1,
    },
    {
      name: 'Cantidad de solicitudes por huésped',
      id: 2,
    },
    {
      name: 'Tiempo de solución a cada solicitud',
      id: 3,
    },
    {
      name: 'Total de solicitudes por módulo',
      id: 4,
    },
    {
      name: 'Promedio de rating en encuestas',
      id: 5,
    },
    {
      name: 'Total de solicitudes por hotel',
      id: 6,
    },
    {
      name: 'Número de habitaciones activadas por hotel',
      id: 7,
    },
    {
      name: 'Solicitudes por hora',
      id: 8,
    },
    {
      name: 'Número de visitas por huésped',
      id: 9,
    },
    {
      name: 'Ganancias del hotel por e-commerce',
      id: 10,
    },
    {
      name: 'Número de empleados activos por hotel',
      id: 11,
    },
  ];

  constructor(private hotelService: HotelService) {
    this.hotels$ = this.hotelService.getAllHotels();
  }

  ngOnInit(): void {}

  get available() {
    return !!this.hotelId && this.since && this.until;
  }
}
