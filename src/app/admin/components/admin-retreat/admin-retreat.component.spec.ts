import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetreatComponent } from './admin-retreat.component';

describe('AdminRetreatComponent', () => {
  let component: AdminRetreatComponent;
  let fixture: ComponentFixture<AdminRetreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRetreatComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminRetreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
