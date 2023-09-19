import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupSalesComponent } from './sup-sales.component';

describe('SupSalesComponent', () => {
  let component: SupSalesComponent;
  let fixture: ComponentFixture<SupSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
