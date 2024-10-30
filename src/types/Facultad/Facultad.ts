export interface Facultad {
  idFacultad: number;
  nombreFacultad: string;
}

export interface CreateFacultad {
  idFacultad: number;
  nombreFacultad: string;
}

export interface UpdateFacultad {
  idFacultad?: number;
  nombreFacultad?: string;
}