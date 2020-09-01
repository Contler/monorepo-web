import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LateCheckOutComponent } from './late-check-out.component';

describe('LateCheckOutComponent', () => {
  let component: LateCheckOutComponent;
  let fixture: ComponentFixture<LateCheckOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LateCheckOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
