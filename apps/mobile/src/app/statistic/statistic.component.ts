import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { EmployerService } from '../services/employer.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'contler-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  private user: EmployerEntity | null = null;
  employees: EmployerEntity[] = [];

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    private employerService: EmployerService,
    public generalService: GeneralService,
  ) {
    this.auth.$user.subscribe(user => (this.user = user));
    this.employerService.getEmployers().subscribe(employer => (this.employees = employer));
  }

  ngOnInit() {}
}
