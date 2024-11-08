import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { Estudiante } from "@/types";

class EstudianteRepository extends GenericRepository<Estudiante> {
  constructor() {
    super("/Estudiante");
  }
}
const estudianteRepository = new EstudianteRepository();

export default estudianteRepository;