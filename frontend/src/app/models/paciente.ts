import { User } from "./user";

export class Paciente extends User{
    nacimiento?:string;
    sexo?:string;
    direccion?:string;
    historial_medico?:string;
    constructor(nacimiento:string|undefined,sexo:string|undefined,direccion:string|undefined,historial_medico:string|undefined,
        name:string,email:string,password:string,password_confirmation:string,telefono:string,rol:string
    ){
        super(name,email,password,password_confirmation,telefono,rol);
        this.nacimiento=nacimiento;
        this.sexo=sexo;
        this.direccion=direccion;
        this.historial_medico=historial_medico;
    }
}