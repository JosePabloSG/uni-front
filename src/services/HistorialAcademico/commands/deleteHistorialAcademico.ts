
import { historialacademicoRepository } from "@/repositories";

export const deleteHistorialAcademico = (id: number): Promise<void> => {
  return historialacademicoRepository.delete(id);
};
