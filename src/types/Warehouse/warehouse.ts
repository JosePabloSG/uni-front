export interface DimAula {
  idAula?: number;
  codigoAula?: string;
  capacidad?: number;
  ubicacion?: string;
  equipamiento?: string;
  hechosUsoRecursos?: [];
}

export interface DimCurso {
  idCurso?: number;
  nombre?: string;
  creditos?: number;
  horasSemana?: number;
  nombreProgramaAcademico?: string;
  hechosCargaDocentes?: [];
  hechosDesempeñoAcademicos?: [];
  hechosInscripciones?: [];
  hechosSatisfacciónEstudiantes?: [];
  hechosUsoRecursos?: [];
}

export interface DimDocente {
  idDocente?: number;
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  especialidad?: string;
  hechosCargaDocentes?: [];
}

export interface DimEstudiante {
  idEstudiante?: number;
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  genero?: string;
  nombreProgramaAcademico?: string;
  hechosDesempeñoAcademicos?: [];
  hechosInscripciones?: [];
  hechosSatisfacciónEstudiantes?: [];
}

export interface DimRecursoAcademico {
  idRecursoAcademico?: number;
  estado?: string;
  tipo?: string;
  hechosUsoRecursos?: [];
}

export interface DimTiempo {
  idTiempo?: number;
  fecha?: string;
  dia?: number;
  mes?: number;
  trimestre?: number;
  semestre?: number;
  año?: number;
  hechosCargaDocentes?: [];
  hechosDesempeñoAcademicos?: [];
  hechosInscripciones?: [];
  hechosSatisfacciónEstudiantes?: [];
  hechosUsoRecursos?: [];
}

export interface HechosCargaDocente {
  idCargaDocente: number;
  horasSemana?: number;
  totalCursosAsignados?: number;
  duracionCursos?: number;
  idDocente?: number;
  idTiempo?: number;
  idCurso?: number;
  idCursoNavigation?: DimCurso;
  idDocenteNavigation?: DimDocente;
  idTiempoNavigation?: DimTiempo;
}

export interface HechosDesempeñoAcademico {
  idDesempeñoAcademico?: number;
  nota?: number;
  aprobado?: boolean;
  idTiempo?: number;
  idEstudiante?: number;
  idCurso?: number;
  idProgramaAcademico?: number;
  idCursoNavigation?: DimCurso;
  idEstudianteNavigation?: DimEstudiante;
  idTiempoNavigation?: DimTiempo;
}

export interface HechosInscripcion {
  idInscripcion?: number;
  estado?: string;
  cantidad?: number;
  idTiempo?: number;
  idEstudiante?: number;
  idCurso?: number;
  idProgramaAcademico?: number;
  idCursoNavigation?: DimCurso;
  idEstudianteNavigation?: DimEstudiante;
  idTiempoNavigation?: DimTiempo;
}

export interface HechosSatisfaccionEstudiantes {
  idSatisfaccion: number;
  nivelSatisfaccion?: number;
  cantidadRespuestas?: number;
  idTiempo?: number;
  idEstudiante?: number;
  idCurso?: number;
  idCursoNavigation?: DimCurso;
  idEstudianteNavigation?: DimEstudiante;
  idTiempoNavigation?: DimTiempo;
}

export interface HechosUsoRecurso {
  idUsoRecurso: number;
  cantidadUso?: number;
  horasUtilizadas?: number;
  idTiempo?: number;
  idCurso?: number;
  idAula?: number;
  idRecursoAcademico?: number;
  idAulaNavigation?: DimAula;
  idCursoNavigation?: DimCurso;
  idRecursoAcademicoNavigation?: DimRecursoAcademico;
  idTiempoNavigation?: DimTiempo;
}
