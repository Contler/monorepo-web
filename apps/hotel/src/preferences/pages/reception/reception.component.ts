import { Component, OnInit } from '@angular/core';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { AuthService } from '../../../services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { ReceptionModule } from '@contler/models/reception-module';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AngularFireDatabase } from '@angular/fire/database';
import { OptionModule } from '@contler/models';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  private hotel: HotelEntity;
  load = true;
  modules: Observable<ReceptionModule | null>;
  constructor(
    private dynamicModule: DynamicModuleService,
    private auth: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.modules = this.auth.$employer.pipe(
      tap((data) => (this.hotel = data.hotel)),
      switchMap((user) => this.dynamicModule.getReceptionModule(user.hotel.uid)),
      tap((data) => (this.load = !data)),
    );
  }

  changeStatus(change: MatSlideToggleChange, index: number) {
    const url = `${MODULES.root}/${this.hotel.uid}/${MODULES.reception}/options/${index}`;
    this.db.object<OptionModule>(url).update({ active: change.checked });
  }

  public goToRoomPage(): void {
    this.router.navigate(['preferences', 'room']);
  }
}
