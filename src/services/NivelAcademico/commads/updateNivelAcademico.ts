import { nivelAcademicoRepository } from "@/repositories";
import { NivelAcademico, UpdateNivelAcademico } from "@/types";

export const updateNivelAcademico = (
  id: number,
  nivelAcademico: UpdateNivelAcademico
): Promise<NivelAcademico> => {
  return nivelAcademicoRepository.update(id, nivelAcademico);
};
