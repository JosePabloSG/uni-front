import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { Horario } from "@/types";

class HorarioRepository extends GenericRepository<Horario> {
  constructor() {
    super("/Horario");
  }
}
const horarioRepository = new HorarioRepository();

export default horarioRepository;
