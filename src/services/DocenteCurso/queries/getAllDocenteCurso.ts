import { docenteCursoRepository } from "@/repositories";

export const getAllDocenteCurso = () => {
  return docenteCursoRepository.getAll();
};
