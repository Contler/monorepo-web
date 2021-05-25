import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmediateItemComponent } from './immediate-item.component';

describe('InmediateItemComponent', () => {
  let component: ImmediateItemComponent;
  let fixture: ComponentFixture<ImmediateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImmediateItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmediateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
