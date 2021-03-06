import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { DynamicModuleService, FormService, InputType, MODULES } from '@contler/dynamic-services';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { FormCreation } from '../../../preferences/components/new-service-wrap/new-service-wrap.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-create-room-module',
  templateUrl: './create-room-module.component.html',
  styleUrls: ['./create-room-module.component.scss'],
})
export class CreateRoomModuleComponent implements OnInit {
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
      MODULES.room,
      null,
      null,
      data.form.length && data.form[0].type === InputType.URL,
    );
    this.load = false;
    return this.route.navigate(['/preferences/room']);
  }
  public async update(data: { formCreation: FormCreation; formService: FormService }): Promise<boolean> {
    this.load = true;
    await this.dynamic.createFormModuleDynamic(
      data.formCreation,
      this.hotel.uid,
      MODULES.room,
      data.formService,
      null,
      data.formService.form.length && data.formService.form[0].type === InputType.URL,
    );
    this.load = false;
    return this.route.navigate(['/preferences/room']);
  }
}
