import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuposComponent } from './categorias.component';

describe('CuposComponent', () => {
  let component: CuposComponent;
  let fixture: ComponentFixture<CuposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
