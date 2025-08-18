export class User{
    name?:string;
    email!:string;
    password!:string;
    password_confirmation!:string;
    telefono!:string;
    rol!:string;
    constructor(name:string,email:string,password:string,password_confirmation:string,telefono:string,rol:string){
        this.name=name;
        this.email=email;
        this.password=password;
        this.password_confirmation=password_confirmation;
        this.telefono=telefono;
        this.rol=rol;
    }
}