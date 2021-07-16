import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEcommerceComponent } from './create-ecommerce.component';

describe('CreateEcommerceComponent', () => {
  let component: CreateEcommerceComponent;
  let fixture: ComponentFixture<CreateEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEcommerceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
