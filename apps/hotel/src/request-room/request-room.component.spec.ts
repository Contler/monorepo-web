import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequestRoomComponent } from './request-room.component';

describe('RequestRoomComponent', () => {
  let component: RequestRoomComponent;
  let fixture: ComponentFixture<RequestRoomComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RequestRoomComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
