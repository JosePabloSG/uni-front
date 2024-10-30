import { programaAcademicoRepository } from "@/repositories";

export const getAllProgramaAcademico = () => {
  return programaAcademicoRepository.getAll();
};   

