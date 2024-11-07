import { docenteCursoRepository } from "@/repositories";

export const deleteDocenteCurso = (id: number): Promise<void> => {
  return docenteCursoRepository.delete(id);
};

