import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CleaningComponent } from './cleaning.component';

describe('CleaningComponent', () => {
  let component: CleaningComponent;
  let fixture: ComponentFixture<CleaningComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CleaningComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
