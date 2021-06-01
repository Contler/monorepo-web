import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingInmediateRequestsPage } from './pending-inmediate-requests.page';

describe('PendingInmediateRequestsPage', () => {
  let component: PendingInmediateRequestsPage;
  let fixture: ComponentFixture<PendingInmediateRequestsPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PendingInmediateRequestsPage],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(PendingInmediateRequestsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
