import { nivelAcademicoRepository } from "@/repositories";
import { NivelAcademico } from "@/types";

export const createNivelAcademico = (
  nivelAcademico: NivelAcademico
): Promise<NivelAcademico> => {
  return nivelAcademicoRepository.create(nivelAcademico);
};
