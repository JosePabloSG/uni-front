import { cursoRecursoAcademicoRepository } from "@/repositories";

export const getAllCursoRecursoAcademico = () => {
  return cursoRecursoAcademicoRepository.getAll();
};