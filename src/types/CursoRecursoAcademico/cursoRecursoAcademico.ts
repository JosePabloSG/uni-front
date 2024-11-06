
export interface CursoRecursoAcademico {
  idCursoRecAcademico?: number;
  idRecursoAcademico?: number;
  idCurso?: number;
  idCursoNavigation?: number | null;
  idRecursoAcademicoNavigation?: number | null;
}


export interface CreateCursoRecursoAcademico {
  idCurso: number;
  idRecursoAcademico: number;
}

export interface UpdateCursoRecursoAcademico {
  idCurso?: number;
  idRecursoAcademico?: number;
}
