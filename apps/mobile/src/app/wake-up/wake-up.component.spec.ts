import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WakeUpComponent } from './wake-up.component';

describe('WakeUpComponent', () => {
  let component: WakeUpComponent;
  let fixture: ComponentFixture<WakeUpComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WakeUpComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
