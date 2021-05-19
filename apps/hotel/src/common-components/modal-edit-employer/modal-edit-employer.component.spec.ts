import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalEditEmployerComponent } from './modal-edit-employer.component';

describe('ModalEditEmployerComponent', () => {
  let component: ModalEditEmployerComponent;
  let fixture: ComponentFixture<ModalEditEmployerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalEditEmployerComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
