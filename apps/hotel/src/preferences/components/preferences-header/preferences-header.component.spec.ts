import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreferencesHeaderComponent } from './preferences-header.component';

describe('PreferencesHeaderComponent', () => {
  let component: PreferencesHeaderComponent;
  let fixture: ComponentFixture<PreferencesHeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PreferencesHeaderComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
