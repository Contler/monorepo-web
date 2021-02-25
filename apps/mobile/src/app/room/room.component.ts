import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contler-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnDestroy {
  currentPage: string | undefined;
  readonly PAGES = {
    PENDING: '/home/room/pending',
    READY: '/home/room/ready',
  };
  private subscribe: Subscription;

  constructor(private router: Router) {
    this.subscribe = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data) => {
        this.currentPage = (data as NavigationEnd).url;
      });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
