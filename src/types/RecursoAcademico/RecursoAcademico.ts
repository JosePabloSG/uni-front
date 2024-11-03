export interface RecursoAcademico {
  idRecursoAcademico?: number;
  estado: string;
  tipo: string;
  cursoRecursoAcademicos?: []
}

export interface CreateRecursoAcademico {
  estado: string;
  tipo: string;
}

export interface UpdateRecursoAcademico {
  estado?: string;
  tipo?: string;
}
