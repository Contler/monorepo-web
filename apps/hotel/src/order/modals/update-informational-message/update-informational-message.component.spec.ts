import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateInformationalMessageComponent } from './update-informational-message.component';

describe('UpdateInformationalMessageComponent', () => {
  let component: UpdateInformationalMessageComponent;
  let fixture: ComponentFixture<UpdateInformationalMessageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UpdateInformationalMessageComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInformationalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
