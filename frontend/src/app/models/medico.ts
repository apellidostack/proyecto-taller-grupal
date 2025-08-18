import { User } from "./user";

export class Medico extends User{
    reg_profesional?:string;
    especialidad_id?:number;
    constructor(reg_profesional:string|undefined,especialidad_id:number|undefined,
        name:string,email:string,password:string,password_confirmation:string,telefono:string,rol:string
    ){
        super(name,email,password,password_confirmation,telefono,rol);
        
        this.reg_profesional=reg_profesional;
        this.especialidad_id=especialidad_id;
    }
}