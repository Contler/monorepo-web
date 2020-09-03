import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public readonly HOME_PATH: string = '/home/guest-requests';

  public opened = false;
  public backUrl: string | null = null;

  constructor() {}
}
