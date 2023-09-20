import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthProviderComponent } from './health-provider.component';

describe('HealthProviderComponent', () => {
  let component: HealthProviderComponent;
  let fixture: ComponentFixture<HealthProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
