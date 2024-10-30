import { programaAcademicoRepository } from "@/repositories";
import { ProgramaAcademico } from "@/types";

export const createProgramaAcademico = (
  programaAcademico: ProgramaAcademico
): Promise<ProgramaAcademico> => {
  return programaAcademicoRepository.create(programaAcademico);
};
