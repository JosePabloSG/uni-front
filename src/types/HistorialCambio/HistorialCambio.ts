export interface HistorialCambio {
  idHistorialCambio?: number;
  usuario: string;
  fecha: string;
  tabla: string;
  idRegistro: number;
  accionRealizada: string;
  datosAnteriores: string | null;
  datosNuevos: string | null;
}