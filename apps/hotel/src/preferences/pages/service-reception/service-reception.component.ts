import { Component, OnInit } from '@angular/core';
import { FormCreation } from '../../components/new-service-wrap/new-service-wrap.component';
import { AuthService } from '../../../services/auth.service';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';
import { DynamicModuleService, FormService, MODULES } from '@contler/dynamic-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-service-reception',
  templateUrl: './service-reception.component.html',
  styleUrls: ['./service-reception.component.scss'],
})
export class ServiceReceptionComponent implements OnInit {
  load = false;
  private hotel: HotelEntity;
  formService$: Observable<FormService> = null;

  constructor(
    private auth: AuthService,
    private dynamic: DynamicModuleService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.auth.$hotel.pipe(first()).subscribe((hotel) => (this.hotel = hotel));
    this.formService$ = this.activatedRoute.paramMap.pipe(
      map((params) => params.get('id')),
      filter((formId) => !!formId),
      tap(() => (this.load = true)),
      switchMap((formId) => this.dynamic.getFormData(formId)),
      tap(() => (this.load = false)),
    );
  }
  async save(data: FormCreation) {
    this.load = true;
    await this.dynamic.createFormModuleDynamic(data, this.hotel.uid, MODULES.reception);
    this.load = false;
    return this.route.navigate(['/preferences/reception']);
  }

  public async update(data: { formCreation: FormCreation; formService: FormService }): Promise<boolean> {
    this.load = true;
    await this.dynamic.createFormModuleDynamic(
      data.formCreation,
      this.hotel.uid,
      MODULES.reception,
      data.formService,
    );
    this.load = false;
    return this.route.navigate(['/preferences/reception']);
  }
}
