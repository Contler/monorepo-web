import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateReservationComponent } from './create-reservation.component';

describe('CreateReservationComponent', () => {
  let component: CreateReservationComponent;
  let fixture: ComponentFixture<CreateReservationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CreateReservationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
