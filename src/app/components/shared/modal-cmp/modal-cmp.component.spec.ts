import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCmpComponent } from './modal-cmp.component';

describe('ModalCmpComponent', () => {
  let component: ModalCmpComponent;
  let fixture: ComponentFixture<ModalCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
