import { recursoAcademicoRepository } from "@/repositories";
import { RecursoAcademico, UpdateRecursoAcademico } from "@/types";

export const updateRecursoAcademico = (
  id: number,
  recursoAcademico: UpdateRecursoAcademico
): Promise<RecursoAcademico> => {
  return recursoAcademicoRepository.update(id, recursoAcademico);
};