import { cursoRepository } from "@/repositories";
import { Curso, UpdateCurso } from "@/types";

export const updateCurso = (
  id: number,
  curso: UpdateCurso
): Promise<Curso> => {
  return cursoRepository.update(id, curso);
};