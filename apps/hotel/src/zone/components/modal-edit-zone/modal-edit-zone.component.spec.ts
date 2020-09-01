import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditZoneComponent } from './modal-edit-zone.component';

describe('ModalEditZoneComponent', () => {
  let component: ModalEditZoneComponent;
  let fixture: ComponentFixture<ModalEditZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
