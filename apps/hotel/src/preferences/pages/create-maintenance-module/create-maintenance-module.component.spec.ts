import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateMaintenanceModuleComponent } from './create-maintenance-module.component';

describe('CreateMaintenanceModuleComponent', () => {
  let component: CreateMaintenanceModuleComponent;
  let fixture: ComponentFixture<CreateMaintenanceModuleComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CreateMaintenanceModuleComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaintenanceModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
