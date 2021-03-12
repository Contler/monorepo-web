import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { ModalInmediateRequestComponent } from 'hotel/common-components/modal-inmediate-request/modal-inmediate-request.component';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@contler/models/language.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'contler-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() tittle: string;
  @Output() toggle: EventEmitter<void> = new EventEmitter();
  @Output() changeCurrentLanguage: EventEmitter<Language> = new EventEmitter();
  notificationList: any[] = [];

  languages: Observable<Language[]>;
  actualLanguage: Language;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private dialog: MatDialog,
    private immediateService: InmediateRequestsService,
    private translate: TranslateService,
    private auth: AuthService,
  ) {
    db.list('notification', (ref) => ref.orderByChild('view').equalTo(false))
      .valueChanges()
      .subscribe((data) => {
        this.notificationList = data;
      });

    this.languages = this.auth.$hotel.pipe(
      switchMap((hotel) =>
        this.db
          .list<Language>(`language/${hotel.uid}`)
          .valueChanges()
          .pipe(
            map((data) => data.filter((item) => item.active)),
            tap((listLan) => {
              const { lan } = window.localStorage;
              this.actualLanguage = listLan.find((l) => l.prefix === lan) || listLan[0];
              this.changeLanguage(this.actualLanguage);
            }),
          ),
      ),
    );
  }

  ngOnInit() {}

  emitToggle() {
    this.toggle.emit();
  }

  goToHome() {
    this.router.navigate(['/home', 'admin']);
  }

  goToImmediate(data: any) {
    this.immediateService.getRequest(data.requestId).subscribe((request) => {
      this.db.database.ref(`notification/${data.uid}`).child('view').set(true);
      this.dialog.open(ModalInmediateRequestComponent, {
        data: { ...request },
      });
    });
  }

  changeLanguage(lan: Language) {
    this.actualLanguage = lan;
    this.translate.use(lan.prefix);
    window.localStorage.lan = lan.prefix;
    this.changeCurrentLanguage.emit(lan);
  }
}
