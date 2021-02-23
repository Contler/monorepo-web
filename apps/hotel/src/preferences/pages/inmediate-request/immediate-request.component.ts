import { Component, OnInit } from '@angular/core';
import { DynamicModuleService } from '@contler/dynamic-services';
import { AuthService } from '../../../services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ImmediateRequestModule } from '@contler/models';
import { HotelEntity } from '@contler/entity';

@Component({
  selector: 'contler-immediate-request',
  templateUrl: './immediate-request.component.html',
  styleUrls: ['./immediate-request.component.scss'],
})
export class ImmediateRequestComponent implements OnInit {
  modules: Observable<ImmediateRequestModule | null>;
  load = true;
  hotel: HotelEntity;

  constructor(private dynamicModule: DynamicModuleService, private auth: AuthService) {}

  ngOnInit(): void {
    this.modules = this.auth.$employer.pipe(
      tap((data) => (this.hotel = data.hotel)),
      switchMap((user) => this.dynamicModule.getImmediateRequestModule(user.hotel.uid)),
      tap((data) => (this.load = !data)),
    );
  }
}
