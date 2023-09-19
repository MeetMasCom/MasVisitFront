import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraEmpresaComponent } from './billetera-empresa.component';

describe('BilleteraEmpresaComponent', () => {
  let component: BilleteraEmpresaComponent;
  let fixture: ComponentFixture<BilleteraEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilleteraEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilleteraEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
