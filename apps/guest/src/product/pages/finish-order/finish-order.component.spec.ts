import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinishOrderComponent } from './finish-order.component';

describe('FinishOrderComponent', () => {
  let component: FinishOrderComponent;
  let fixture: ComponentFixture<FinishOrderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FinishOrderComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
