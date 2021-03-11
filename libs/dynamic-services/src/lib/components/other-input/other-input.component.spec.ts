import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherInputComponent } from './other-input.component';

describe('OtherInputComponent', () => {
  let component: OtherInputComponent;
  let fixture: ComponentFixture<OtherInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtherInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
