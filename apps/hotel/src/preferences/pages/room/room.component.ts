import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { AuthService } from 'hotel/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, tap } from 'rxjs/operators';
import { RoomModule } from '@contler/models/room-module';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OptionModule } from '@contler/models';

@Component({
  selector: 'contler-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  load = true;
  modules$: Observable<RoomModule | null>;
  private hotel: HotelEntity;

  constructor(
    private dynamicModule: DynamicModuleService,
    private auth: AuthService,
    private db: AngularFireDatabase,
  ) {}

  ngOnInit(): void {
    this.modules$ = this.auth.$employer.pipe(
      tap((data) => (this.hotel = data.hotel)),
      switchMap((user) => this.dynamicModule.getRoomModule(user.hotel.uid)),
      tap((data) => (this.load = !data)),
    );
  }

  public changeStatus($event: MatSlideToggleChange, index: number): void {
    const url = `${MODULES.root}/${this.hotel.uid}/${MODULES.room}/options/${index}`;
    this.db.object<OptionModule>(url).update({ active: $event.checked });
  }
}
