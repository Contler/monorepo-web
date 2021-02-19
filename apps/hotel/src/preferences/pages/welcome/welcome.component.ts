import { Component, OnInit } from '@angular/core';
import { AuthService } from 'hotel/services/auth.service';
import { Observable } from 'rxjs';
import { HotelEntity } from '@contler/entity';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public hotel$: Observable<HotelEntity> = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.hotel$ = this.authService.$employer.pipe(map((employer) => employer.hotel));
  }
  public goToModuleList(): void {
    this.router.navigate(['preferences', 'modules']);
  }
}
