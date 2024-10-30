import { programaAcademicoRepository } from "@/repositories";

export const deleteProgramaAcademico = (id: number): Promise<void> => {
  return programaAcademicoRepository.delete(id);
};
