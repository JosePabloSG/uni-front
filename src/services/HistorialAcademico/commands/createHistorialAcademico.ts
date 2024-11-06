import { historialacademicoRepository } from "@/repositories";
import { HistorialAcademico } from "@/types";

export const createHistorialAcademico = (historialacademico: HistorialAcademico): Promise<HistorialAcademico> => {
  return historialacademicoRepository.create(historialacademico);
};
