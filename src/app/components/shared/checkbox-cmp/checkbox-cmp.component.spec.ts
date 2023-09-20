import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCmpComponent } from './checkbox-cmp.component';

describe('CheckboxCmpComponent', () => {
  let component: CheckboxCmpComponent;
  let fixture: ComponentFixture<CheckboxCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxCmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
