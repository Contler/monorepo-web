import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleRoomComponent } from './single-room.component';

describe('SingleRoomComponent', () => {
  let component: SingleRoomComponent;
  let fixture: ComponentFixture<SingleRoomComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SingleRoomComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
