import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadForm } from './especialidad-form';

describe('EspecialidadForm', () => {
  let component: EspecialidadForm;
  let fixture: ComponentFixture<EspecialidadForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
