import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalRemoveEmployerComponent } from './modal-remove-employer.component';

describe('ModalRemoveEmployerComponent', () => {
  let component: ModalRemoveEmployerComponent;
  let fixture: ComponentFixture<ModalRemoveEmployerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalRemoveEmployerComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRemoveEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
