import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { GuestService } from 'guest/services/guest.service';
import { GuestEntity, HotelEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@contler/models/language.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { SIDEBAR_CONSTANTS } from './sidebar.contants';

@Component({
  selector: 'contler-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  actualLanguage: Language;
  languages: Observable<Language[]>;
  hotel: HotelEntity;
  guest: GuestEntity;
  constants = SIDEBAR_CONSTANTS;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private guestService: GuestService,
    private translate: TranslateService,
    private db: AngularFireDatabase,
  ) {
    this.guestService.$guest.pipe(first()).subscribe((guest) => {
      this.hotel = guest?.hotel;
      this.guest = guest;
      this.languages = this.db
        .list<Language>(`language/${this.hotel.uid}`)
        .valueChanges()
        .pipe(
          map((data) => data.filter((item) => item.active)),
          tap((listLan) => {
            const { lan } = window.localStorage;
            this.actualLanguage = listLan.find((l) => l.prefix === lan) || listLan[0];
            this.changeLanguage(this.actualLanguage);
          }),
        );
    });
  }

  async logout() {
    this.auth
      .signOut()
      .then(() => this.router.navigate(['/login']))
      .catch(() => {});
  }

  changeLanguage(lan: Language) {
    this.actualLanguage = lan;
    this.translate.use(this.actualLanguage.prefix);
    window.localStorage.lan = this.actualLanguage.prefix;
  }
}

interface MenuItem {
  icon: string;
  name: string;
  route: string | null;
}
