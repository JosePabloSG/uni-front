import { inscripcionRepository } from "@/repositories";

export const deleteInscripcion = (id: number): Promise<void> => {
  return inscripcionRepository.delete(id);
};    
