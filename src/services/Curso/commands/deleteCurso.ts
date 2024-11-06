
import { cursoRepository } from "@/repositories";

export const deleteCurso = (id: number): Promise<void> => {
  return cursoRepository.delete(id);
};