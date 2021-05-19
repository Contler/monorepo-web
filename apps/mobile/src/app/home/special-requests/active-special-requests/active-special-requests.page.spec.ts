import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActiveSpecialRequestsPage } from './active-special-requests.page';

describe('ActiveSpecialRequestsPage', () => {
  let component: ActiveSpecialRequestsPage;
  let fixture: ComponentFixture<ActiveSpecialRequestsPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ActiveSpecialRequestsPage],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ActiveSpecialRequestsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
