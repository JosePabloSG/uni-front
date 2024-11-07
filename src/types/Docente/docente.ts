export interface Docente {
  idDocente?: number;
  nombreCompletoDocente?: string;
  email?: string;
  especialidad?: string;
  telefono?: string;
  direccion?: string;
}

export interface CreateDocente {
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  especialidad: string;
  telefono: string;
  direccion: string;
}

export interface UpdateDocente {
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  email?: string;
  especialidad?: string;
  telefono?: string;
  direccion?: string;
}
