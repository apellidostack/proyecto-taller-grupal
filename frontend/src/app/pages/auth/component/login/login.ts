import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { Sesion } from '@/models/sesion';
import { LoginService } from '@/services/login-service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule,
     RouterModule, RippleModule, AppFloatingConfigurator,
    ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  checked: boolean = false;
    private formBuilder=inject(FormBuilder);
    private loginService=inject(LoginService);
    private router=inject(Router);
    
    formGroup = this.formBuilder.nonNullable.group({
      email:["",Validators.email],
      password:["",Validators.required],
    });

    logear(){
      
      this.loginService.login(this.formGroup).subscribe({
        next:(d)=>{
          console.log(d);
          const sesion=new Sesion(d.user.name,d.user.rol,d.token);
          this.loginService.guardarToken(sesion);
          if(d.user.rol=="administrador"){
            this.router.navigateByUrl("/admin")
          }else
          if(d.user.rol=="medico"){
            this.router.navigateByUrl("/medico")
          }else
          if(d.user.rol=="paciente"){
            this.router.navigateByUrl("/paciente")
          }
          
        },
        error:(e)=>{
          console.log(e);
        }
      });
    }
}
