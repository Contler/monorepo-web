import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'contler-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent implements OnInit {
  icons: Observable<{ key: string; name: string; keyObj: string }[]>;
  name: string;
  key: string;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.icons = this.db
      .object('icons')
      .valueChanges()
      .pipe(
        map((data) => {
          return Object.keys(data).map((key) => ({ keyObj: key, key: data[key].key, name: data[key].name }));
        }),
      );
  }

  deleteIcon(key: string) {
    this.db.object(`icons/${key}`).remove();
  }

  createIcon() {
    const uid = this.db.createPushId();
    this.db
      .object('icons/' + uid)
      .set({
        name: this.name,
        key: this.key,
      })
      .then(() => {
        this.name = null;
        this.key = null;
      });
  }
}
