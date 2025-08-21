import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { Sesion } from '@/models/sesion';
import { LoginService } from '@/services/login-service';
import { UsuariosService } from '@/services/usuarios-service';
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
    private usuarioService=inject(UsuariosService);
    private router=inject(Router);
    
    formGroup = this.formBuilder.nonNullable.group({
      email:["",Validators.email],
      password:["",Validators.required],
    });

    logear(){
      
      this.loginService.login(this.formGroup).subscribe({
        next:(d)=>{
          console.log(d);
          this.usuarioService.usuarioPorId(d.user.id).subscribe({
            next:u=>{
              if(u.perfil_paciente){
                const sesion=new Sesion(d.user.name,d.user.rol,d.token,u.id);
                this.loginService.guardarToken(sesion);
                this.router.navigateByUrl("/pages/paciente");
              }else if(u.perfil_medico){
                const sesion=new Sesion(d.user.name,d.user.rol,d.token,u.id);
                this.loginService.guardarToken(sesion);
                this.router.navigateByUrl("/pages/medico");
                
              }else{
                const sesion=new Sesion(d.user.name,d.user.rol,d.token,u.id);
                this.loginService.guardarToken(sesion);

                this.router.navigateByUrl("/pages/admin");
              }

            }
          }); 
          
        },
        error:(e)=>{
          console.log(e);
        }
      });
    }
}
