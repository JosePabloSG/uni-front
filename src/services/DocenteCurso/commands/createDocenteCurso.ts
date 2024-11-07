import { docenteCursoRepository } from "@/repositories";
import { DocenteCurso } from "@/types";

export const createDocenteCurso = (docenteCurso: DocenteCurso): Promise<DocenteCurso> => {
  return docenteCursoRepository.create(docenteCurso);
};
