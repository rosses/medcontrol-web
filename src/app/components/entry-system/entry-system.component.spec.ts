import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrySystemComponent } from './entry-system.component';

describe('EntrySystemComponent', () => {
  let component: EntrySystemComponent;
  let fixture: ComponentFixture<EntrySystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrySystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrySystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
