import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBilleteraEComponent } from './update-billetera-e.component';

describe('UpdateBilleteraEComponent', () => {
  let component: UpdateBilleteraEComponent;
  let fixture: ComponentFixture<UpdateBilleteraEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBilleteraEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBilleteraEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
