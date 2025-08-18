
import { Especialidad } from '@/models/especialidad';
import { Medico } from '@/models/medico';
import { Paciente } from '@/models/paciente';
import { User } from '@/models/user';
import { EspecialidadesService } from '@/services/especialidades-service';
import { UsuariosService } from '@/services/usuarios-service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-user-form',
  imports: [FluidModule, SelectModule, InputTextModule, FormsModule, ButtonModule,
    ReactiveFormsModule,CommonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm implements OnInit{
  @Input() edit?:User|Medico|Paciente;
  ngOnInit(): void {
    this.listarEspecialidad();
    if(this.edit){
      this.formGroup.controls.name.setValue(this.edit.name!);
      this.formGroup.controls.email.setValue(this.edit.email!);
      this.formGroup.controls.rol.setValue(this.edit.rol!);
      this.formGroup.controls.telefono.setValue(this.edit.telefono!);
      if (this.edit.rol === 'medico'&&this.edit instanceof Medico) {
        this.formGroup.setControl('tipo', this.buildMedico());
        this.formGroup.controls.tipo.get("reg_profesional")?.setValue(this.edit.reg_profesional!);
        this.formGroup.controls.tipo.get("especialidad_id")?.setValue(this.edit.especialidad_id!);
        
      } else if (this.edit.rol === 'paciente'&& this.edit instanceof Paciente) {
        this.formGroup.setControl('tipo', this.buildPaciente());
        this.formGroup.controls.tipo.get("nacimiento")?.setValue(this.edit.nacimiento!);
        this.formGroup.controls.tipo.get("sexo")?.setValue(this.edit.sexo!);
        this.formGroup.controls.tipo.get("direccion")?.setValue(this.edit.direccion!);
        this.formGroup.controls.tipo.get("historial_medico")?.setValue(this.edit.historial_medico!);
    } else {
      // vacío para 'administrador' u otros
      this.formGroup.setControl('tipo', this.formBuilder.group({}));
    }
    }
  }
  roles=[
    "administrador",
    "medico",
    "paciente",
  ]
  private formBuilder=inject(FormBuilder);
  private especialidadService=inject(EspecialidadesService);
  private usuarioService=inject(UsuariosService);
  especialidades:Especialidad[]=[];
  formGroup=this.formBuilder.nonNullable.group({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    telefono: '',
    rol: '',
    tipo: this.formBuilder.group<any>({}),
  });
  private buildMedico() {
    return this.formBuilder.group({
      reg_profesional: [''],
      especialidad_id: [0,[Validators.required]],
    });
  }

  private buildPaciente() {
    return this.formBuilder.group({
      nacimiento: [''],
      sexo: [''],
      direccion: [''],
      historial_medico: [''],
    });
  }

  registrarUsuario(){
    if(this.formGroup.valid){
      const { name, email, password, password_confirmation, telefono, rol, tipo } = this.formGroup.value;

    let usuario: User;

    if (rol === "medico") {
      usuario = new Medico(
        this.formGroup.controls.tipo.get('reg_profesional')?.value as string,
    this.formGroup.controls.tipo.get('especialidad_id')?.value as number,
    this.formGroup.get('name')?.value as string,
    this.formGroup.get('email')?.value as string,
    this.formGroup.get('password')?.value as string,
    this.formGroup.get('password_confirmation')?.value as string,
    this.formGroup.get('telefono')?.value as string,
    this.formGroup.get('rol')?.value as string,
      );
    } else if (rol === "paciente") {
      usuario = new Paciente(
        this.formGroup.controls.tipo.get('nacimiento')?.value as string,
        this.formGroup.controls.tipo.get('sexo')?.value as string,
        this.formGroup.controls.tipo.get('direccion')?.value as string,
        this.formGroup.controls.tipo.get('historial_medico')?.value as string,
        
        this.formGroup.get('name')?.value as string,
    this.formGroup.get('email')?.value as string,
    this.formGroup.get('password')?.value as string,
    this.formGroup.get('password_confirmation')?.value as string,
    this.formGroup.get('telefono')?.value as string,
    this.formGroup.get('rol')?.value as string,
      );
    } else {
      // rol === "admin" o "user"
      usuario = new User(this.formGroup.get('name')?.value as string,
    this.formGroup.get('email')?.value as string,
    this.formGroup.get('password')?.value as string,
    this.formGroup.get('password_confirmation')?.value as string,
    this.formGroup.get('telefono')?.value as string,
    this.formGroup.get('rol')?.value as string,);
    }

    console.log("Usuario creado:", usuario);
    this.usuarioService.registrarUsuario(usuario).subscribe({
      next:(d)=>{
        console.log(d);
        
      }
    })
    }
  }
  rolSeleccionado(e:any){
    let rol=e.value;
    console.log(rol);
    if (rol === 'medico') {
      this.formGroup.setControl('tipo', this.buildMedico());
    } else if (rol === 'paciente') {
      this.formGroup.setControl('tipo', this.buildPaciente());
    } else {
      // vacío para 'administrador' u otros
      this.formGroup.setControl('tipo', this.formBuilder.group({}));
    }
    
  }

  especialiadChange(e:any){
    const es= e.value;
    console.log(this.formGroup.value);
    
  }

  listarEspecialidad(){
    this.especialidadService.listarEspecialidades().subscribe(d=>{
      this.especialidades=d;
    })
  }

}
