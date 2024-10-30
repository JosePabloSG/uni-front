export interface Inscripcion {
  idInscripcion?: number;
  fechaInscripcion?: string;
  estado: string;
  idCurso: number;
  idEstudiante: number;
}


export interface CreateInscripcion {
  idEstudiante: number;
  idCurso: number;
  estado: string;
}


export interface UpdateInscripcion {
  idInscripcion?: number;
  nuevoEstado?: string;
}