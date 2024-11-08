import { estudianteRepository } from "@/repositories";
import { Estudiante } from "@/types";

export const createEstudiante = (estudiante: Estudiante): Promise<Estudiante> => {
  return estudianteRepository.create(estudiante);
};