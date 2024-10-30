import { inscripcionRepository } from "@/repositories";
import { Inscripcion } from "@/types";

export const createInscripcion = (inscripcion: Inscripcion): Promise<Inscripcion> => {
  return inscripcionRepository.create(inscripcion);
};