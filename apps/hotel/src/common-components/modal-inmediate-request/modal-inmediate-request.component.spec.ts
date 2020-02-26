import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInmediateRequestComponent } from './modal-inmediate-request.component';

describe('ModalInmediateRequestComponent', () => {
  let component: ModalInmediateRequestComponent;
  let fixture: ComponentFixture<ModalInmediateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInmediateRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInmediateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
