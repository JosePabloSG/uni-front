
import { cursoAulaRepository } from "@/repositories";

export const getAllCursoAula = () => { 
  return cursoAulaRepository.getAll();
};
