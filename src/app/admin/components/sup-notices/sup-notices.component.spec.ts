import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupNoticesComponent } from './sup-notices.component';

describe('SupNoticesComponent', () => {
  let component: SupNoticesComponent;
  let fixture: ComponentFixture<SupNoticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupNoticesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
