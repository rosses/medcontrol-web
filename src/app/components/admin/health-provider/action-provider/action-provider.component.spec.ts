import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionProviderComponent } from './action-provider.component';

describe('ActionProviderComponent', () => {
  let component: ActionProviderComponent;
  let fixture: ComponentFixture<ActionProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
