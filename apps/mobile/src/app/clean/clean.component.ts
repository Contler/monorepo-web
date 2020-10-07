import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'contler-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.scss'],
})
export class CleanComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception: number;

  constructor(private auth: AuthService, public menu: MenuController) {
    this.auth.$user.pipe(take(1)).subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}
}
