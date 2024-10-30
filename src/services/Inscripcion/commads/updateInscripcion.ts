import { inscripcionRepository } from "@/repositories";
import { Inscripcion, UpdateInscripcion } from "@/types";

export const updateInscripcion = (
  id: number,
  inscripcion: UpdateInscripcion
): Promise<Inscripcion> => {
  return inscripcionRepository.update(id, inscripcion);
};