import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public readonly HOME_PATH: string = '/home/guest-requests';

  public opened: boolean = false;
  public backUrl: string | null = null;

  constructor() {}
}
