import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialRequestsPage } from './special-requests.page';

describe('SpecialRequestsPage', () => {
  let component: SpecialRequestsPage;
  let fixture: ComponentFixture<SpecialRequestsPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SpecialRequestsPage],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(SpecialRequestsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
