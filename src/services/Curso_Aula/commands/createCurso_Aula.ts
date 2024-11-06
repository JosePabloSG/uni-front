
import { cursoAulaRepository } from "@/repositories";
import { CursoAula } from "@/types";


export const createCursoAula = (cursoAula: CursoAula): Promise<CursoAula> => {
  return cursoAulaRepository.create(cursoAula);
};
