import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalProductComponent } from './modal-product.component';

describe('ModalProductComponent', () => {
  let component: ModalProductComponent;
  let fixture: ComponentFixture<ModalProductComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalProductComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
