import { nivelAcademicoRepository } from "@/repositories";

export const getAllNivelAcademico = () => {
  return nivelAcademicoRepository.getAll();
};
