export interface CursoAula {
    idCursoAula: number;
    horarioClase: string;
    idCurso: number;
    idAula: number;
    idAulaNavigation?: number;
    idCursoNavigation?: number;
}

export interface CreateCursoAula {
    idCursoAula?: number;
    horarioClase: string;
    idCurso: number;
    idAula: number;
    idAulaNavigation?: number;
    idCursoNavigation?: number;
}

export interface UpdateCursoAula {
    horarioClase?: string;
    idCurso?: number;
    idAula?: number;
    idAulaNavigation?: number;
    idCursoNavigation?: number;
}