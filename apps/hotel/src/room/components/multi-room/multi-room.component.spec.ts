import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRoomComponent } from './multi-room.component';

describe('MultiRoomComponent', () => {
  let component: MultiRoomComponent;
  let fixture: ComponentFixture<MultiRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiRoomComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
