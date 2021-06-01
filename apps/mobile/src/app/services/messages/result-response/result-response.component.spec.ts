import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultResponseComponent } from './result-response.component';

describe('ResultResponseComponent', () => {
  let component: ResultResponseComponent;
  let fixture: ComponentFixture<ResultResponseComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResultResponseComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
