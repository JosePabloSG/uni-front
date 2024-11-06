import { aulaRepository } from "@/repositories";

export const deleteAula = (id: number): Promise<void> => {
  return aulaRepository.delete(id);
};
