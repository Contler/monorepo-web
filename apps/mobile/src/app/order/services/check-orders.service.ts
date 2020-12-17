import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CheckOrdersService {
  private sub = new Subject<void>();
  $completeOrder = this.sub.asObservable();

  constructor() {}

  complete() {
    this.sub.next();
  }
}
