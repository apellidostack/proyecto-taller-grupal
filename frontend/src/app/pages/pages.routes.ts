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
import { adminGuard } from './auth/guards/admin-guard';
import { medicoGuard } from './auth/guards/medico-guard';
import { pacienteGuard } from './auth/guards/paciente-guard';

export default [
    { path: 'empty', component: Empty },
    { path: 'admin', component: Users,canActivate:[adminGuard] },
    { path: 'especialidades', component: EspecialidadesCrud,canActivate:[adminGuard] },
    { path: 'horarios', component: HorariosCrud,canActivate:[adminGuard] },
    { path: 'medico', component: CrudCitas,canActivate:[medicoGuard] },
    { path: 'medico/reporte', component: ReporteCitas,canActivate:[medicoGuard] },
    {
  path: 'paciente',
  component: ReservarCita,
  canActivate:[pacienteGuard],
  resolve: { citaActual: citaActualResolver },
    },
    {
      path: 'paciente/reporte',
      component: InformacionCita,
      canActivate:[pacienteGuard]
    },

    { path: '**', redirectTo: '/notfound' }
] as Routes;
