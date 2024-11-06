import { recursoAcademicoRepository } from "@/repositories";
import { RecursoAcademico } from "@/types";

export const createRecursoAcademico = (
  recursoAcademico: RecursoAcademico
): Promise<RecursoAcademico> => {
  return recursoAcademicoRepository.create(recursoAcademico);
};