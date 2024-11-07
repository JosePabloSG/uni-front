import { docenteRepository } from "@/repositories";
import { Docente, UpdateDocente } from "@/types";

export const updateDocente = (
  id: number,
  docente: UpdateDocente
): Promise<Docente> => {
  return docenteRepository.update(id, docente);
};
