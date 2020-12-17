import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { GeneralService } from '../services/general.service';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'contler-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  user: EmployerEntity | null = null;

  constructor(private auth: AuthService, public generalService: GeneralService) {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
  }

  ngOnInit() {}
}
