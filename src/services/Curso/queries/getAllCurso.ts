import { cursoRepository } from "@/repositories";

export const getAllCurso = () => {
  return cursoRepository.getAll();
};

