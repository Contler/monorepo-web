import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalInmediateRequestPage } from './modal-inmediate-request.page';

describe('ModalInmediateRequestPage', () => {
  let component: ModalInmediateRequestPage;
  let fixture: ComponentFixture<ModalInmediateRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInmediateRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInmediateRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
