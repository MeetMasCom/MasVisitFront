import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackInstagramComponent } from './callback-instagram.component';

describe('CallbackInstagramComponent', () => {
  let component: CallbackInstagramComponent;
  let fixture: ComponentFixture<CallbackInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallbackInstagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallbackInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
