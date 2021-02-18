import { Component, OnInit } from '@angular/core';
import { ModuleData } from '../../interfaces/module-data';
import { DynamicModuleService } from '@contler/dynamic-services';
import { AuthService } from '../../../services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ImmediateRequestModule } from '@contler/models';

@Component({
  selector: 'contler-immediate-request',
  templateUrl: './immediate-request.component.html',
  styleUrls: ['./immediate-request.component.scss'],
})
export class ImmediateRequestComponent implements OnInit {
  data: ModuleData = {
    title: '',
    icon: '',
    description: '',
    description2: '',
  };

  modules: Observable<ImmediateRequestModule | null>;
  load = true;

  constructor(private dynamicModule: DynamicModuleService, private auth: AuthService) {}

  ngOnInit(): void {
    this.modules = this.auth.$employer.pipe(
      switchMap((user) => this.dynamicModule.getImmediateRequestModule(user.hotel.uid)),
      tap((data) => (this.load = !data)),
    );
  }
}
