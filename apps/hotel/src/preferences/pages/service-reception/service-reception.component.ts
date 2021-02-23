import { Component, OnInit } from '@angular/core';
import { FormCreation } from '../../components/new-service-wrap/new-service-wrap.component';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-service-reception',
  templateUrl: './service-reception.component.html',
  styleUrls: ['./service-reception.component.scss'],
})
export class ServiceReceptionComponent implements OnInit {
  load = false;
  private hotel: HotelEntity;

  constructor(private auth: AuthService, private dynamic: DynamicModuleService, private route: Router) {}

  ngOnInit(): void {
    this.auth.$hotel.pipe(first()).subscribe((hotel) => (this.hotel = hotel));
  }
  async save(data: FormCreation) {
    this.load = true;
    await this.dynamic.createFormModuleDynamic(data, this.hotel.uid, MODULES.reception);
    this.load = false;
    return this.route.navigate(['/preferences/reception']);
  }
}
