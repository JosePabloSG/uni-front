
import { docenteRepository } from "@/repositories";

export const deleteDocente = (id: number): Promise<void> => {
  return docenteRepository.delete(id);
};