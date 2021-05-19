import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuestRequestsComponent } from './guest-requests.component';

describe('GuestRequestsComponent', () => {
  let component: GuestRequestsComponent;
  let fixture: ComponentFixture<GuestRequestsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GuestRequestsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
