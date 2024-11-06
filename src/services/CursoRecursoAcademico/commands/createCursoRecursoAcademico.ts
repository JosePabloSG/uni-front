import { cursoRecursoAcademicoRepository } from "@/repositories";
import { CursoRecursoAcademico } from "@/types";

export const createCursoRecursoAcademico = (
  cursoRecursoAcademico: CursoRecursoAcademico
): Promise<CursoRecursoAcademico> => {
  return cursoRecursoAcademicoRepository.create(cursoRecursoAcademico);
};