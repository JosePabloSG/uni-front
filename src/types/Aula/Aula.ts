export interface Aula {
  idAula?: number;
  codigoAula: string;
  capacidad: number;
  ubicacion: string;
  equipamiento: string;
  cursoaula?: string[];
  IdUsuario: number; // Agrega esta propiedad - NUEVO

}

export interface CreateAula { 
  
  codigoAula: string;
  capacidad: number;
  ubicacion: string;
  equipamiento: string;
  IdUsuario: number; // Agrega esta propiedad - NUEVO

}

export interface UpdateAula {
  codigoAula?: string;
  capacidad?: number;
  ubicacion?: string;
  equipamiento?: string;
}