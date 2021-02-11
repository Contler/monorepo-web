import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubZoneReservationComponent } from './sub-zone-reservation.component';

describe('SubZoneReservationComponent', () => {
  let component: SubZoneReservationComponent;
  let fixture: ComponentFixture<SubZoneReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubZoneReservationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubZoneReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
