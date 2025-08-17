import { Component } from '@angular/core';
import { Login } from '../auth/component/login/login';

@Component({
    selector: 'app-empty',
    imports: [Login],
    standalone: true,
    template: ` <app-login/>`
})
export class Empty {}
