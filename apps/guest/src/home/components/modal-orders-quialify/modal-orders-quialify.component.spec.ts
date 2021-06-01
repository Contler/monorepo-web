import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalOrdersQuialifyComponent } from './modal-orders-quialify.component';

describe('ModalOrdersQuialifyComponent', () => {
  let component: ModalOrdersQuialifyComponent;
  let fixture: ComponentFixture<ModalOrdersQuialifyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalOrdersQuialifyComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrdersQuialifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
