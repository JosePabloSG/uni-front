import { horarioRepository } from "@/repositories";
import { Horario } from "@/types";

export const createHorario = (horario: Horario): Promise<Horario> => {
  return horarioRepository.create(horario);
};