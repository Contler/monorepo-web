import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderCompleteComponent } from './order-complete.component';

describe('OrderCompleteComponent', () => {
  let component: OrderCompleteComponent;
  let fixture: ComponentFixture<OrderCompleteComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderCompleteComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
