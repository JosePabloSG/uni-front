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
  duracion: number;
  idNivelAcademico: number;
  idFacultad: number;
}

export interface UpdateProgramaAcademico { 
  nombrePrograma?: string;
  duracion?: number;
  idNivelAcademico?: number;
  idFacultad?: number;
}