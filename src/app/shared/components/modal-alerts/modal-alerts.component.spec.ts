import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlertsComponent } from './modal-alerts.component';

describe('ModalAlertsComponent', () => {
  let component: ModalAlertsComponent;
  let fixture: ComponentFixture<ModalAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
