import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubZoneReservationComponent } from './sub-zone-reservation.component';

describe('SubZoneReservationComponent', () => {
  let component: SubZoneReservationComponent;
  let fixture: ComponentFixture<SubZoneReservationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SubZoneReservationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SubZoneReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
