import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ReceptionService, UserService } from '@contler/core';
import { ReceptionModel } from '@contler/models';
import { map, mergeMap, switchMap, take, toArray } from 'rxjs/operators';
import { from, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { GuestEntity } from '@contler/entity';
import { MatPaginator } from '@angular/material/paginator';

interface ReqRecpetionGuest {
  request: ReceptionModel;
  guest: GuestEntity;
}

@Component({
  selector: 'contler-reception-request',
  templateUrl: './reception-request.component.html',
  styleUrls: ['./reception-request.component.scss'],
})
export class ReceptionRequestComponent implements OnInit, OnDestroy {
  @Input() filterByStatusSelected: string;
  @Input() textFilter: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  dataSource = new MatTableDataSource<ReqRecpetionGuest>([]);
  displayedColumns: string[] = ['userName', 'room', 'message', 'created_at', 'status', 'actions'];

  private subscribe: Subscription;

  constructor(
    private receptionService: ReceptionService,
    private afs: AngularFirestore,
    private auth: UserService,
  ) {}

  ngOnInit(): void {
    const req = this.receptionService.receptionRef;
    this.subscribe = this.afs
      .collection<ReceptionModel>(req)
      .valueChanges()
      .pipe(
        take(1),
        switchMap((data) => from(data)),
        mergeMap((request) =>
          this.auth.getGuestById(request.guest).pipe(map((guest) => ({ request, guest }))),
        ),
        toArray(),
      )
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }
}
