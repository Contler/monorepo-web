import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZoneListComponent } from './zone-list.component';

describe('ZoneListComponent', () => {
  let component: ZoneListComponent;
  let fixture: ComponentFixture<ZoneListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ZoneListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
