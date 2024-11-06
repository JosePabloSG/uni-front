
import { cursoRecursoAcademicoRepository } from "@/repositories";

export const deleteCursoRecursoAcademico = (id: number): Promise<void> => {
  return cursoRecursoAcademicoRepository.delete(id);
};