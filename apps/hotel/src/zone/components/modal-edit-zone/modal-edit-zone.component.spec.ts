import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalEditZoneComponent } from './modal-edit-zone.component';

describe('ModalEditZoneComponent', () => {
  let component: ModalEditZoneComponent;
  let fixture: ComponentFixture<ModalEditZoneComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalEditZoneComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
