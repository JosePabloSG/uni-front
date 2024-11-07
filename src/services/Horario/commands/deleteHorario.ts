import { horarioRepository } from "@/repositories";

export const deleteHorario = (id: number): Promise<void> => {
  return horarioRepository.delete(id);
};
