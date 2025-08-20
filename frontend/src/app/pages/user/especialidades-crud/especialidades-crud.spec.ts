import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesCrud } from './especialidades-crud';

describe('EspecialidadesCrud', () => {
  let component: EspecialidadesCrud;
  let fixture: ComponentFixture<EspecialidadesCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadesCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadesCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
