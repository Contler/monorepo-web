import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWakeComponent } from './create-wake.component';

describe('CretaeWakeComponent', () => {
  let component: CreateWakeComponent;
  let fixture: ComponentFixture<CreateWakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
