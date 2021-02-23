import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from 'hotel/services/auth.service';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormCreation } from 'hotel/preferences/components/new-service-wrap/new-service-wrap.component';

@Component({
  selector: 'contler-create-maintenance-module',
  templateUrl: './create-maintenance-module.component.html',
  styleUrls: ['./create-maintenance-module.component.scss'],
})
export class CreateMaintenanceModuleComponent implements OnInit {
  load = false;
  private hotel: HotelEntity;

  constructor(private auth: AuthService, private dynamic: DynamicModuleService, private route: Router) {}

  ngOnInit(): void {
    this.auth.$hotel.pipe(first()).subscribe((hotel) => (this.hotel = hotel));
  }

  async save(data: FormCreation) {
    this.load = true;
    await this.dynamic.createFormModuleDynamic(data, this.hotel.uid, MODULES.maintenance);
    this.load = false;
    return this.route.navigate(['/preferences/maintenance']);
  }
}
