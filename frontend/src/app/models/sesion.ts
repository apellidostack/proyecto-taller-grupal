export class Sesion {
    name!:string;
    rol!:string;
    token!:string;
    constructor(name:string,rol:string,token:string){
        this.name=name;
        this.rol=rol;
        this.token=token;
    }
}