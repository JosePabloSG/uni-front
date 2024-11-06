export interface Facultad {
  idFacultad?: number;
  nombreFacultad: string;
}

export interface CreateFacultad {
  nombreFacultad: string;
}

export interface UpdateFacultad {
  nombreFacultad?: string;
}