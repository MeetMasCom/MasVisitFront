import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsLayoutsComponent } from './ads-layouts.component';

describe('AdsLayoutsComponent', () => {
  let component: AdsLayoutsComponent;
  let fixture: ComponentFixture<AdsLayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdsLayoutsComponent]
    });
    fixture = TestBed.createComponent(AdsLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
