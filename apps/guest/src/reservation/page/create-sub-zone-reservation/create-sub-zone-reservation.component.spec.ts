import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubZoneReservationComponent } from './create-sub-zone-reservation.component';

describe('CreateSubZoneReservationComponent', () => {
  let component: CreateSubZoneReservationComponent;
  let fixture: ComponentFixture<CreateSubZoneReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubZoneReservationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubZoneReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
