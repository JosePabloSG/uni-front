import { historialCambioRepository } from "@/repositories";

export const getHistorialCambio = () => {
  return historialCambioRepository.getAll();
};
