import { estudianteRepository } from "@/repositories";
import { Estudiante, UpdateEstudiante } from "@/types";

export const updateEstudiante = (
  id: number,
  estudiante: UpdateEstudiante
): Promise<Estudiante> => {
  return estudianteRepository.update(id, estudiante);
};