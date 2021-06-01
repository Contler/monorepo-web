import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalQualifyComponent } from './modal-qualify.component';

describe('ModalQualifyComponent', () => {
  let component: ModalQualifyComponent;
  let fixture: ComponentFixture<ModalQualifyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalQualifyComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQualifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
