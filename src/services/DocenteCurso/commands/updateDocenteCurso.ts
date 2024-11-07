import { docenteCursoRepository } from "@/repositories";
import { DocenteCurso, UpdateDocenteCurso } from "@/types";

export const updateDocenteCurso = (
  id: number,
  docenteCurso: UpdateDocenteCurso
): Promise<DocenteCurso> => {
  return docenteCursoRepository.update(id, docenteCurso);
};