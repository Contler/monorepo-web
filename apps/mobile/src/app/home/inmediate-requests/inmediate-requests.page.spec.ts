import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InmediateRequestsPage } from './inmediate-requests.page';

describe('InmediateRequestsPage', () => {
  let component: InmediateRequestsPage;
  let fixture: ComponentFixture<InmediateRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmediateRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InmediateRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
