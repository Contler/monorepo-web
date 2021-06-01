import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalConfirmWakeComponent } from './modal-confirm-wake.component';

describe('ModalConfirmWakeComponent', () => {
  let component: ModalConfirmWakeComponent;
  let fixture: ComponentFixture<ModalConfirmWakeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalConfirmWakeComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmWakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
