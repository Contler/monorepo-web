import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReceptionItemComponent } from './reception-item.component';

describe('ReceptionItemComponent', () => {
  let component: ReceptionItemComponent;
  let fixture: ComponentFixture<ReceptionItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReceptionItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
