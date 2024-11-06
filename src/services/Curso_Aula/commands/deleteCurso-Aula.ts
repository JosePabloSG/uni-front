import { cursoAulaRepository } from "@/repositories";

export const deleteCursoAula = (id: number): Promise<void> => {
  return cursoAulaRepository.delete(id);
};
