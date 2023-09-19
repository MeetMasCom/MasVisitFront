import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColummsComponent } from './columms.component';

describe('ColummsComponent', () => {
  let component: ColummsComponent;
  let fixture: ComponentFixture<ColummsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColummsComponent]
    });
    fixture = TestBed.createComponent(ColummsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
