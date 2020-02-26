import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBookingQualifyComponent } from './modal-booking-qualify.component';

describe('ModalBookingQualifyComponent', () => {
  let component: ModalBookingQualifyComponent;
  let fixture: ComponentFixture<ModalBookingQualifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBookingQualifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBookingQualifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
