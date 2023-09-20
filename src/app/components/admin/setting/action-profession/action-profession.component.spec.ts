import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionProfessionComponent } from './action-profession.component';

describe('ActionProfessionComponent', () => {
  let component: ActionProfessionComponent;
  let fixture: ComponentFixture<ActionProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionProfessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
