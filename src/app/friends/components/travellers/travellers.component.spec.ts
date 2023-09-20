import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellersComponent } from './travellers.component';

describe('TravellersComponent', () => {
  let component: TravellersComponent;
  let fixture: ComponentFixture<TravellersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellersComponent]
    });
    fixture = TestBed.createComponent(TravellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
