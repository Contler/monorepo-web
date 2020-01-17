import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEmployerComponent } from './modal-edit-employer.component';

describe('ModalEditEmployerComponent', () => {
  let component: ModalEditEmployerComponent;
  let fixture: ComponentFixture<ModalEditEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
