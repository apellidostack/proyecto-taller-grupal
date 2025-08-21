import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from '@/pages/auth/auth-guard';
import { UserForm } from '@/pages/user/components/user-form/user-form';
import { Users } from '@/pages/user/users/users';
import { ReservarCita } from '@/pages/paciente/reservar-cita/reservar-cita';
import { CrudCitas } from '@/pages/medico/crud-citas/crud-citas';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', component: AppLayout },
/*             { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') }, */
            //{ path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
