import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkRequestComponent } from './drink-request.component';

describe('DrinkRequestComponent', () => {
  let component: DrinkRequestComponent;
  let fixture: ComponentFixture<DrinkRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
