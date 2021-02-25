import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningItemComponent } from './cleaning-item.component';

describe('CleaningItemComponent', () => {
  let component: CleaningItemComponent;
  let fixture: ComponentFixture<CleaningItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
