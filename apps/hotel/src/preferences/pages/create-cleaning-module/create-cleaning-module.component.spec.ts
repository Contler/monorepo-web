import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCleaningModuleComponent } from './create-cleaning-module.component';

describe('CreateCleaningModuleComponent', () => {
  let component: CreateCleaningModuleComponent;
  let fixture: ComponentFixture<CreateCleaningModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCleaningModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCleaningModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
