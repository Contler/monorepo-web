import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchbarComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
