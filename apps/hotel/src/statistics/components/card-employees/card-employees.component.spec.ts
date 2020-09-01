import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmployeesComponent } from './card-employees.component';

describe('CardEmployeesComponent', () => {
  let component: CardEmployeesComponent;
  let fixture: ComponentFixture<CardEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
