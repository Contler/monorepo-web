import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadyInmediateRequestsPage } from './ready-inmediate-requests.page';

describe('ReadyInmediateRequestsPage', () => {
  let component: ReadyInmediateRequestsPage;
  let fixture: ComponentFixture<ReadyInmediateRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyInmediateRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadyInmediateRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
