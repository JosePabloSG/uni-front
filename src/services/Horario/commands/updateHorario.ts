import { horarioRepository } from "@/repositories";
import { Horario, UpdateHorario } from "@/types";

export const updateHorario = (
  id: number,
  horario: UpdateHorario
): Promise<Horario> => {
  return horarioRepository.update(id, horario);
};
