import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployerComponent } from './modal-employer.component';

describe('ModalEmployerComponent', () => {
  let component: ModalEmployerComponent;
  let fixture: ComponentFixture<ModalEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
