
export interface Estudiante {
  idEstudiante?: number;
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  IdUsuario: number;
}

export interface CreateEstudiante {
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  telefono: string;
  direccion: string;
  IdUsuario: number;
}


export interface UpdateEstudiante {
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}