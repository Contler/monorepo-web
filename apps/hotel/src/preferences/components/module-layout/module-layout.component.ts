import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'hotel/services/auth.service';
import { map, take } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';
import { ModuleData } from '../../interfaces/module-data';

@Component({
  selector: 'contler-module-layout',
  templateUrl: './module-layout.component.html',
  styleUrls: ['./module-layout.component.scss'],
})
export class ModuleLayoutComponent implements OnInit {
  @Input() data: ModuleData;

  hotel: HotelEntity;

  constructor(private auth: AuthService) {
    this.auth.$employer
      .pipe(
        take(1),
        map((user) => user.hotel),
      )
      .subscribe((hotel) => (this.hotel = hotel));
  }

  ngOnInit(): void {}

  get paramName() {
    return this.hotel ? { value: this.hotel.name } : { value: '' };
  }
}
