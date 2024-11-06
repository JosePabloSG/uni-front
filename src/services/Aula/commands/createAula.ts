
import { aulaRepository } from "@/repositories";
import { Aula } from "@/types";

export const createAula = (aula: Aula): Promise<Aula> => {
  return aulaRepository.create(aula);
};