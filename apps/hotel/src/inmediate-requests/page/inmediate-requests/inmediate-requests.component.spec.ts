import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InmediateRequestsComponent } from './inmediate-requests.component';

describe('InmediateRequestsComponent', () => {
  let component: InmediateRequestsComponent;
  let fixture: ComponentFixture<InmediateRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmediateRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmediateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
