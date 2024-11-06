
import { recursoAcademicoRepository } from "@/repositories";

export const deleteRecursoAcademicoById = (id: number): Promise<void> => {
  return recursoAcademicoRepository.delete(id);
};