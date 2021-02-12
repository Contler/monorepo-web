import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubZoneReservationFormComponent } from './sub-zone-reservation-form.component';

describe('SubZoneReservationFormComponent', () => {
  let component: SubZoneReservationFormComponent;
  let fixture: ComponentFixture<SubZoneReservationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubZoneReservationFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubZoneReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
