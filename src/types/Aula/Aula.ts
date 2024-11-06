export interface Aula {
  idAula?: number;
  codigoAula: string;
  capacidad: number;
  ubicacion: string;
  equipamiento: string;
  cursoaula?: string[];
}

export interface CreateAula { 
  
  codigoAula: string;
  capacidad: number;
  ubicacion: string;
  equipamiento: string;
}

export interface UpdateAula {
  codigoAula?: string;
  capacidad?: number;
  ubicacion?: string;
  equipamiento?: string;
}