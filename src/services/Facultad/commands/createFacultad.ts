import { facultadRepository } from "@/repositories";
import { Facultad } from "@/types";

export const createFacultad = (facultad: Facultad): Promise<Facultad> => {
  return facultadRepository.create(facultad);
};
