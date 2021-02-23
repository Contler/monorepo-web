import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomModuleComponent } from './create-room-module.component';

describe('CreateRoomModuleComponent', () => {
  let component: CreateRoomModuleComponent;
  let fixture: ComponentFixture<CreateRoomModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoomModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
