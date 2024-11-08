import { estudianteRepository } from "@/repositories";

export const deleteEstudiante = (id: number): Promise<void> => {
  return estudianteRepository.delete(id);
};
