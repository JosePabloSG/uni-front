import { recursoAcademicoRepository } from "@/repositories";

export const getAllRecursosAcademicos = () => {
  return recursoAcademicoRepository.getAll();
};