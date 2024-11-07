export interface Horario {
      idHorario?: number;
      fechaInicio: string;
      fechaFin: string;
      idDocente: number;
      idCurso: number;
      idCursoNavigation?: number;
      idDocenteNavigation?: number;
}
export interface CreateHorario {
    fechaInicio: string;
    fechaFin: string;
    idDocente: number;
    idCurso: number;
    idCursoNavigation?: number;
    idDocenteNavigation?: number;
}

export interface UpdateHorario {
      fechaInicio?: string;
      fechaFin?: string;
      idDocente?: number;
      idCurso?: number;
  }
