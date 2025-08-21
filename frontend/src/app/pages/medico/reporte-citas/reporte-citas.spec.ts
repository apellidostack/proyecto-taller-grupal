import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCitas } from './reporte-citas';

describe('ReporteCitas', () => {
  let component: ReporteCitas;
  let fixture: ComponentFixture<ReporteCitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteCitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
