export interface Curso {
  idCurso?: number;
  nombre?: string;
  codigoCurso?: string;
  creditos?: number;
  horasSemana?: number;
  idProgAcademico?: number;
  cursoAulas?: [];
  cursoRecursoAcademicos?: [];
  docenteCursos?: [];
  historialAcademicos?: [];
  horarios?: []
  idProgAcademicoNavigation?: number | null;
  inscripcions?: [];
}

export interface CreateCurso {
  Nombre: string;
  CodigoCurso: string;
  Creditos: number;
  HorasSemana: number;
  IdProgAcademico: number;
}


export interface UpdateCurso {
  Nombre?: string;
  CodigoCurso?: string;
  Creditos?: number;
  HorasSemana?: number;
  IdProgAcademico?: number;
}