import { docenteRepository } from "@/repositories";

export const getAllDocente = () => {
  return docenteRepository.getAll();
};
