import { horarioRepository } from "@/repositories";

export const getAllHorario = () => {
  return horarioRepository.getAll();
};
