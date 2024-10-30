export interface ProgramaAcademico {
  idProgAcademico?: number;
  nombrePrograma: string;
  duracion?: number;
  idNivelAcademico?: number;
  nivelAcademico?: string;
  idFacultad?: number;
  nombreFacultad?: string;
}


export interface CreateProgramaAcademico {
  nombrePrograma: string;
  Duracion: number;
  IdNivelAcademico: number;
  IdFacultad: number;
}


export interface UpdateProgramaAcademico {
  nombrePrograma?: string;
  Duracion?: number;
  IdNivelAcademico?: number;
  IdFacultad?: number;
}