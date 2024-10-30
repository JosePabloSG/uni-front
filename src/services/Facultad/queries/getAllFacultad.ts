

import { facultadRepository } from "@/repositories";

export const getAllFacultad = () => {
  return facultadRepository.getAll();
};
