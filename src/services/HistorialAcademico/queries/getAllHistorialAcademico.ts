
import { historialacademicoRepository } from "@/repositories";

export const getAllHistorialAcademico = () => { 
  return historialacademicoRepository.getAll();
};
