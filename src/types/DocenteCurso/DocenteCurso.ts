export interface DocenteCurso {
  idDocenteCurso?: number;
  idCurso?: number;
  idDocente?: number;
}

export interface CreateDocenteCurso {
  idDocente: number;
  idCurso: number;
}

export interface UpdateDocenteCurso {
  idDocente?: number;
  idCurso?: number;
}