export interface HistorialAcademico {
    idHistorialAcademico: number;
    idEstudiante: number;
    nombreCompletoEstudiante: string;
    emailEstudiante: string;
    telefonoEstudiante: string;
    idCurso: number;
    nombreCurso: string;
    idProgAcademico: number;
    nombrePrograma: string;
    idFacultad: number;
    nombreFacultad: string;
    idDocente: number;
    nombreCompletoDocente: string;
    nota: number;
    fechaCalificacion: string;
}

export interface CreateHistorialAcademico {
    idEstudiante: number;
    idCurso: number;
    nota: number;
}

export interface UpdateHistorialAcademico {
    idHistorial?: number;
    nota?: number;
    fechaCalificacion?: string;
}
