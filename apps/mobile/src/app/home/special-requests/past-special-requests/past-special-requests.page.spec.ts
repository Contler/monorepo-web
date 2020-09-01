import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastSpecialRequestsPage } from './past-special-requests.page';

describe('PastSpecialRequestsPage', () => {
  let component: PastSpecialRequestsPage;
  let fixture: ComponentFixture<PastSpecialRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastSpecialRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastSpecialRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
