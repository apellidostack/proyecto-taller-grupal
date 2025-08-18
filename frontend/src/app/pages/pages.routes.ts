import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { CrudCitas } from './medico/crud-citas/crud-citas';
import { Users } from './user/users/users';
import { ReservarCita } from './paciente/reservar-cita/reservar-cita';

export default [
    { path: 'empty', component: Empty },
    { path: 'admin', component: Users },
    { path: 'medico', component: CrudCitas },
    { path: 'paciente', component: ReservarCita },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
