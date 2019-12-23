import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSpecialRequestPage } from './modal-special-request.page';

describe('ModalSpecialRequestPage', () => {
  let component: ModalSpecialRequestPage;
  let fixture: ComponentFixture<ModalSpecialRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSpecialRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSpecialRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
