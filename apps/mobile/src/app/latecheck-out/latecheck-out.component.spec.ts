import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LatecheckOutComponent } from './latecheck-out.component';

describe('LatecheckOutComponent', () => {
  let component: LatecheckOutComponent;
  let fixture: ComponentFixture<LatecheckOutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LatecheckOutComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LatecheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
