import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MarcoComponent } from './marco.component';

describe('MarcoComponent', () => {
  let component: MarcoComponent;
  let fixture: ComponentFixture<MarcoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MarcoComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
