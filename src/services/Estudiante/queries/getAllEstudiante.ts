import { estudianteRepository } from "@/repositories";

export const getAllEstudiante = () => {
  return estudianteRepository.getAll();
};
