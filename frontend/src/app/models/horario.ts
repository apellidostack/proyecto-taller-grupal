export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public email_verified_at: string | null,
    public rol: string,
    public telefono: string | null,
    public estado: string,
    public created_at: string,
    public updated_at: string
  ) {}
}

export class Especialidad {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public estado: string,
    public created_at: string,
    public updated_at: string
  ) {}
}

export class Horario {
  constructor(
    public id: number,
    public dia_semana: number,
    public tiempo_inicio: string,
    public tiempo_final: string,
    public duracion_cita: string,
    public estado: string,
    public medico_id: number,
    public created_at: string,
    public updated_at: string
  ) {}
}

export class MedicoHorarios {
  constructor(
    public id: number,
    public reg_profesional: string,
    public biografia: string,
    public especialidad_id: number,
    public user_id: number,
    public created_at: string,
    public updated_at: string | null,
    public user: User,
    public especialidad: Especialidad,
    public horarios: Horario[]
  ) {}
  
}


export class HorarioConMedico extends Horario {
  constructor(
    id: number,
    dia_semana: number,
    tiempo_inicio: string,
    tiempo_final: string,
    duracion_cita: string,
    estado: string,
    medico_id: number,
    created_at: string,
    updated_at: string,
    public medicoNombre: string,
    public medicoReg: string
  ) {
    super(id, dia_semana, tiempo_inicio, tiempo_final, duracion_cita, estado, medico_id, created_at, updated_at);
  }
}

