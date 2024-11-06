import { cursoRecursoAcademicoRepository } from "@/repositories";
import { CursoRecursoAcademico, UpdateCursoRecursoAcademico } from "@/types";

export const updateCursoRecursoAcademico = (
  id: number,
  cursoRecursoAcademico: UpdateCursoRecursoAcademico
): Promise<CursoRecursoAcademico> => {
  return cursoRecursoAcademicoRepository.update(id, cursoRecursoAcademico);
};
