import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupSystemsComponent } from './sup-systems.component';

describe('SupSystemsComponent', () => {
  let component: SupSystemsComponent;
  let fixture: ComponentFixture<SupSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupSystemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
