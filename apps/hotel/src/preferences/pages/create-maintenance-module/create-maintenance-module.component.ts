import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '@contler/hotel/services/auth.service';
import { DynamicModuleService, FormService, InputType, MODULES } from '@contler/dynamic-services';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { FormCreation } from '@contler/hotel/preferences/components/new-service-wrap/new-service-wrap.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-create-maintenance-module',
  templateUrl: './create-maintenance-module.component.html',
  styleUrls: ['./create-maintenance-module.component.scss'],
})
export class CreateMaintenanceModuleComponent implements OnInit {
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
    await this.dynamic.createFormModuleDynamic(
      data,
      this.hotel.uid,
      MODULES.maintenance,
      null,
      null,
      data.form.length && data.form[0].type === InputType.URL,
    );
    this.load = false;
    return this.route.navigate(['/preferences/maintenance']);
  }
  public async update(data: { formCreation: FormCreation; formService: FormService }): Promise<boolean> {
    this.load = true;
    await this.dynamic.createFormModuleDynamic(
      data.formCreation,
      this.hotel.uid,
      MODULES.maintenance,
      data.formService,
      null,
      data.formService.form.length && data.formService.form[0].type === InputType.URL,
    );
    this.load = false;
    return this.route.navigate(['/preferences/maintenance']);
  }
}
