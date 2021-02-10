import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSubZoneComponent } from './schedule-sub-zone.component';

describe('ScheduleSubZoneComponent', () => {
  let component: ScheduleSubZoneComponent;
  let fixture: ComponentFixture<ScheduleSubZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleSubZoneComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSubZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
