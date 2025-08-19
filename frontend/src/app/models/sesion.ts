export class Sesion {
    name!:string;
    rol!:string;
    token!:string;
    id!:number;
    constructor(name:string,rol:string,token:string,id:number){
        this.name=name;
        this.rol=rol;
        this.id=id;
        this.token=token;
    }
}