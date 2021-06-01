import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalEditGuestComponent } from './modal-edit-guest.component';

describe('ModalEditGuestComponent', () => {
  let component: ModalEditGuestComponent;
  let fixture: ComponentFixture<ModalEditGuestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalEditGuestComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
