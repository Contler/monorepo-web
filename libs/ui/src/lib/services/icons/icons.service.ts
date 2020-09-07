import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IconModel } from '@contler/models/icon.model';
import { Observable } from 'rxjs';

@Injectable()
export class IconsService {
  $icons: Observable<IconModel[]>;

  constructor(private db: AngularFireDatabase) {
    this.$icons = this.db.list<IconModel>('icons').valueChanges();
  }
}
