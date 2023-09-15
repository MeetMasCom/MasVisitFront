import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesTypeComponent } from './notices-type.component';

describe('NoticesTypeComponent', () => {
  let component: NoticesTypeComponent;
  let fixture: ComponentFixture<NoticesTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticesTypeComponent]
    });
    fixture = TestBed.createComponent(NoticesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
