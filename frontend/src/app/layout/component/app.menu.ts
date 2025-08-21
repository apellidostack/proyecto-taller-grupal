import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { LoginService } from '@/services/login-service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    private loginService=inject(LoginService);
    model: MenuItem[] = [];
    
    ngOnInit() {
        const sesionApp = this.loginService.token();
        if(sesionApp ){
            switch(sesionApp.rol){
                case "administrador": this.model = this.admin;
                break;
                case "medico": this.model = this.doctor;
                break;
                case "paciente": this.model = this.paciente;
                break;
            }

        }
    }
    
    cerrarSesion(){
        
        this.loginService.cerraSesion();
    }


    admin=[
                {
                    label: 'Admin',
                    items: [{ label: this.loginService.token()?.name, icon: 'pi pi-fw pi-user' }]
                },
                {
                    label: 'Menu',
                    items: [
                        { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/pages/admin'] },
                        { label: 'Especialidades', icon: 'pi pi-fw pi-thumbtack', routerLink: ['/pages/especialidades'] },
                        { label: 'Horarios', icon: 'pi pi-fw pi-clock', routerLink: ['/pages/horarios'] }
                    ]
                },
                
                {
                    label: 'Cerrar Sesion',
                     
                    items: [{ label: "Cerrar Sesion",icon: 'pi pi-fw pi-sign-out' ,
                        command: () => {
                        
                        this.cerrarSesion();
                    },
                    }]
                },
                
            ];
    doctor=[
                {
                    label: 'Medico',
                    items: [{ label: this.loginService.token()?.name, icon: 'pi pi-fw pi-user' }]
                },
                {
                    label: 'Menu',
                    items: [{ label: 'Citas', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/medico'] },
                            { label: 'Reportes', icon: 'pi pi-fw pi-pen-to-square', routerLink: ['/pages/medico/reporte'] }
                        ]
                },
                {
                    label: 'Cerrar Sesion',
                     
                    items: [{ label: "Cerrar Sesion",icon: 'pi pi-fw pi-sign-out' ,
                        command: () => {
                        
                        this.cerrarSesion();
                    },
                    }]
                },
                
            ];
    paciente=[
                {
                    label: 'Usuario',
                    items: [{ label: this.loginService.token()?.name, icon: 'pi pi-fw pi-user' }]
                },
                {
                    label: 'Cerrar Sesion',
                     
                    items: [{ label: "Cerrar Sesion",icon: 'pi pi-fw pi-sign-out' ,
                        command: () => {
                        
                        this.cerrarSesion();
                    },
                    }]
                },
                
            ];
}
