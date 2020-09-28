/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CleaningComponent } from './cleaning.component';

describe('CleaningComponent', () => {
  let component: CleaningComponent;
  let fixture: ComponentFixture<CleaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
