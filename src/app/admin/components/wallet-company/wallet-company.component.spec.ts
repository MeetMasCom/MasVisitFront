import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCompanyComponent } from './wallet-company.component';

describe('WalletCompanyComponent', () => {
  let component: WalletCompanyComponent;
  let fixture: ComponentFixture<WalletCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletCompanyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WalletCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
