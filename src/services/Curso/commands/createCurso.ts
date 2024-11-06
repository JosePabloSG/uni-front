import { cursoRepository } from "@/repositories";
import { CreateCurso, Curso } from "@/types";

export const createCurso = (curso: CreateCurso): Promise<Curso> => {
  return cursoRepository.create(curso);
};
