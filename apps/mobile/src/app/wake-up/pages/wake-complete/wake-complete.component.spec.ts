import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeCompleteComponent } from './wake-complete.component';

describe('WakeCompleteComponent', () => {
  let component: WakeCompleteComponent;
  let fixture: ComponentFixture<WakeCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
