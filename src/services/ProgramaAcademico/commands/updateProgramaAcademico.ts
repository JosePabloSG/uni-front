import { programaAcademicoRepository } from "@/repositories";
import { ProgramaAcademico, UpdateProgramaAcademico } from "@/types";

export const updateProgramaAcademico = (
  id: number,
  programaAcademico: UpdateProgramaAcademico
): Promise<ProgramaAcademico> => {
  return programaAcademicoRepository.update(id, programaAcademico);
};