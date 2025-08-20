import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosCrud } from './horarios-crud';

describe('HorariosCrud', () => {
  let component: HorariosCrud;
  let fixture: ComponentFixture<HorariosCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
