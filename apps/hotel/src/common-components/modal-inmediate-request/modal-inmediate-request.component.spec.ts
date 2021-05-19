import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalInmediateRequestComponent } from './modal-inmediate-request.component';

describe('ModalInmediateRequestComponent', () => {
  let component: ModalInmediateRequestComponent;
  let fixture: ComponentFixture<ModalInmediateRequestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalInmediateRequestComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInmediateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
