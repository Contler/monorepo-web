import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintainComponent } from './maintain.component';

describe('MaintainComponent', () => {
  let component: MaintainComponent;
  let fixture: ComponentFixture<MaintainComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MaintainComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
