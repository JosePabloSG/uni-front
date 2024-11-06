
import { historialacademicoRepository } from "@/repositories";
import {  HistorialAcademico, UpdateHistorialAcademico } from "@/types";

export const updateHistorialAcademico  = (
  id: number,
  historialacademico: UpdateHistorialAcademico
): Promise<HistorialAcademico> => {
  return historialacademicoRepository.update(id, historialacademico);
};
