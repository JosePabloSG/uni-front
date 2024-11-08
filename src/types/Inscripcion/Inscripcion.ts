
export interface Inscripcion {
  idInscripcion?: number;
  fechaInscripcion?: string;
  estado?: string;
  idCurso?: number;
  idEstudiante?: number;
}

export interface CreateInscripcion {
  idEstudiante?: number;
  idCurso?: number;
}


export interface UpdateInscripcion { 
  idEstudiante?: number;
  idCurso?: number;
  nuevoEstado?: string;
}