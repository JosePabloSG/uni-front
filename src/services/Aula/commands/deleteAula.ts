import { aulaRepository } from "@/repositories";

export const deleteAula = (idAula: number, idUsuario: number): Promise<void> => {
  return aulaRepository.delete(idAula, idUsuario); // Pasa idUsuario al repositorio
};