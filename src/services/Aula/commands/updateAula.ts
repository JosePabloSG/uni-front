import { aulaRepository } from "@/repositories";
import { Aula, UpdateAula } from "@/types";

export const updateAula  = (
  id: number,
  aula: UpdateAula
): Promise<Aula> => {
  return aulaRepository.update(id, aula);
};
