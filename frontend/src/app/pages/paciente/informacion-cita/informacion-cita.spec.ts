import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCita } from './informacion-cita';

describe('InformacionCita', () => {
  let component: InformacionCita;
  let fixture: ComponentFixture<InformacionCita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionCita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionCita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
