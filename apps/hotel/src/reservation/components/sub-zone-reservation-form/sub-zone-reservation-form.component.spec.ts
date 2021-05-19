import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubZoneReservationFormComponent } from './sub-zone-reservation-form.component';

describe('SubZoneReservationFormComponent', () => {
  let component: SubZoneReservationFormComponent;
  let fixture: ComponentFixture<SubZoneReservationFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SubZoneReservationFormComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SubZoneReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
