import { cursoAulaRepository } from "@/repositories";
import { CursoAula, UpdateCursoAula } from "@/types";

export const updateCursoAula  = (
  id: number,
  cursoaula: UpdateCursoAula
): Promise<CursoAula> => {
  return cursoAulaRepository.update(id, cursoaula);
};
