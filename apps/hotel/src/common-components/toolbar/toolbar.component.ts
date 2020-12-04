import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { ModalInmediateRequestComponent } from 'hotel/common-components/modal-inmediate-request/modal-inmediate-request.component';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  name: string;
  prefix: string;
}

@Component({
  selector: 'contler-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggle: EventEmitter<void> = new EventEmitter();
  notificationList: any[] = [];

  language: Language[] = [
    {
      name: 'Español',
      prefix: 'es-CO',
    },
    {
      name: 'English',
      prefix: 'en-US',
    },
  ];

  actualLanguage: Language;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private dialog: MatDialog,
    private immediateService: InmediateRequestsService,
    private translate: TranslateService,
  ) {
    db.list('notification', (ref) => ref.orderByChild('view').equalTo(false))
      .valueChanges()
      .subscribe((data) => {
        this.notificationList = data;
      });
    this.actualLanguage = this.language[0];
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
  }
}
