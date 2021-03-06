import { Component, Input, OnInit } from '@angular/core';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { ReservationService } from '@contler/core';

@Component({
  selector: 'contler-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit {
  @Input() zoneReservations: ZoneReserveEntity[] = [];
  load = false;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {}

  deleteReservation(zoneReservation: ZoneReserveEntity) {
    this.load = true;
    this.reservationService.deleteReservation(zoneReservation.id).subscribe(() => {
      this.zoneReservations = this.zoneReservations.filter((z) => z.id !== zoneReservation.id);
      this.load = false;
    });
  }

  public deleteSubZoneReservation(subZoneReserveEntity: ZoneReserveEntity): void {
    this.load = true;
    this.reservationService.deleteReservation(subZoneReserveEntity.id).subscribe(() => {
      this.zoneReservations = this.zoneReservations.map((zoneReserve) => {
        if (zoneReserve.id === subZoneReserveEntity.zoneParent.id) {
          zoneReserve.subZone = zoneReserve.subZone.filter((z) => z.id !== subZoneReserveEntity.id);
          return zoneReserve;
        }
        return zoneReserve;
      });
      this.load = false;
    });
  }
}
