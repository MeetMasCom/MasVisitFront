import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLayoutComponent } from './start-layout.component';

describe('StartLayoutComponent', () => {
  let component: StartLayoutComponent;
  let fixture: ComponentFixture<StartLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartLayoutComponent]
    });
    fixture = TestBed.createComponent(StartLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
