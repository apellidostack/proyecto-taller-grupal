import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCitas } from './crud-citas';

describe('CrudCitas', () => {
  let component: CrudCitas;
  let fixture: ComponentFixture<CrudCitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
