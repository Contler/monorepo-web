import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatecheckOutComponent } from './latecheck-out.component';

describe('LatecheckOutComponent', () => {
  let component: LatecheckOutComponent;
  let fixture: ComponentFixture<LatecheckOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatecheckOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatecheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
