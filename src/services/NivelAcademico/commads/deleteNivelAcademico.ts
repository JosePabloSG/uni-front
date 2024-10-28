import { nivelAcademicoRepository } from "@/repositories";

export const deleteNivelAcademico = (id: number): Promise<void> => {
  return nivelAcademicoRepository.delete(id);
};

