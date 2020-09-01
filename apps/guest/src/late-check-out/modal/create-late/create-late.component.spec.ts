import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLateComponent } from './create-late.component';

describe('CreateLateComponent', () => {
  let component: CreateLateComponent;
  let fixture: ComponentFixture<CreateLateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
