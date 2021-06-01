import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditSpecialZoneGuestComponent } from './edit-special-zone-guest.component';

describe('EditSpecialZoneGuestComponent', () => {
  let component: EditSpecialZoneGuestComponent;
  let fixture: ComponentFixture<EditSpecialZoneGuestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditSpecialZoneGuestComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecialZoneGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
