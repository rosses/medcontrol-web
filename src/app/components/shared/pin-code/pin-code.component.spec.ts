import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCodeComponent } from './pin-code.component';

describe('PinCodeComponent', () => {
  let component: PinCodeComponent;
  let fixture: ComponentFixture<PinCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
