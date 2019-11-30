import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneRequestComponent } from './zone-request.component';

describe('ZoneRequestComponent', () => {
  let component: ZoneRequestComponent;
  let fixture: ComponentFixture<ZoneRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
