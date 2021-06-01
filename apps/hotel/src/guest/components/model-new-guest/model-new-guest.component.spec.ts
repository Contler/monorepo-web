import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelNewGuestComponent } from './model-new-guest.component';

describe('ModelNewGuestComponent', () => {
  let component: ModelNewGuestComponent;
  let fixture: ComponentFixture<ModelNewGuestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModelNewGuestComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelNewGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
