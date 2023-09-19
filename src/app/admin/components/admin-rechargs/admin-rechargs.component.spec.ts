import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRechargsComponent } from './admin-rechargs.component';

describe('AdminRechargsComponent', () => {
  let component: AdminRechargsComponent;
  let fixture: ComponentFixture<AdminRechargsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRechargsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminRechargsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
