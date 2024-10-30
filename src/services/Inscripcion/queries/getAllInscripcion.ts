import { inscripcionRepository } from "@/repositories";

export const getAllInscripcion = () => {
  return inscripcionRepository.getAll();
};
