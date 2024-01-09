import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticaComponent } from './analitica.component';

describe('AnaliticaComponent', () => {
  let component: AnaliticaComponent;
  let fixture: ComponentFixture<AnaliticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});