import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelEntity } from '@contler/entity';
import { AuthService } from 'hotel/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'contler-preferences-header',
  templateUrl: './preferences-header.component.html',
  styleUrls: ['./preferences-header.component.scss'],
})
export class PreferencesHeaderComponent implements OnInit {
  public hotel$: Observable<HotelEntity> = null;
  @Input() title = '';
  @Input() subtitle = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.hotel$ = this.authService.$employer.pipe(map((employer) => employer.hotel));
  }
}
