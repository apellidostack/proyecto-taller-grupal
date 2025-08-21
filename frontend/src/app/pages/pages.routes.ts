import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { CrudCitas } from './medico/crud-citas/crud-citas';
import { Users } from './user/users/users';
import { ReservarCita } from './paciente/reservar-cita/reservar-cita';
import { EspecialidadesCrud } from './user/especialidades-crud/especialidades-crud';
import { HorariosCrud } from './user/horarios-crud/horarios-crud';
import { InformacionCita } from './paciente/informacion-cita/informacion-cita';
import { citaActualResolver } from './auth/guards/cita-actual.resolver';
import { ReporteCitas } from './medico/reporte-citas/reporte-citas';

export default [
    { path: 'empty', component: Empty },
    { path: 'admin', component: Users },
    { path: 'especialidades', component: EspecialidadesCrud },
    { path: 'horarios', component: HorariosCrud },
    { path: 'medico', component: CrudCitas },
    { path: 'medico/reporte', component: ReporteCitas },
    {
  path: 'paciente',
  component: ReservarCita,
  resolve: { citaActual: citaActualResolver },
    },
    {
      path: 'paciente/reporte',
      component: InformacionCita
    },

    { path: '**', redirectTo: '/notfound' }
] as Routes;
