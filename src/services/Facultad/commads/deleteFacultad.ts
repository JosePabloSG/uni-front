
import { facultadRepository } from "@/repositories";

export const deleteFacultad = (id: number): Promise<void> => {
  return facultadRepository.delete(id);
};
