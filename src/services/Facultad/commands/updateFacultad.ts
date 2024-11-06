
import { facultadRepository } from "@/repositories";
import { Facultad, UpdateFacultad } from "@/types";

export const updateFacultad = (
  id: number,
  facultad: UpdateFacultad
): Promise<Facultad> => {
  return facultadRepository.update(id, facultad);
};
