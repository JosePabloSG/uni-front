
import { docenteRepository } from "@/repositories";
import { Docente } from "@/types";

export const createDocente = (docente: Docente): Promise<Docente> => {
  return docenteRepository.create(docente);
};
