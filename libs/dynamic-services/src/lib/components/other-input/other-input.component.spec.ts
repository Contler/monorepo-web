import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OtherInputComponent } from './other-input.component';

describe('OtherInputComponent', () => {
  let component: OtherInputComponent;
  let fixture: ComponentFixture<OtherInputComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OtherInputComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
