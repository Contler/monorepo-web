import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakePendingComponent } from './wake-pending.component';

describe('WakePendingComponent', () => {
  let component: WakePendingComponent;
  let fixture: ComponentFixture<WakePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
