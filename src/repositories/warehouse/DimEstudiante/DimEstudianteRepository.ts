import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { DimEstudiante } from "@/types";

class DimEstudianteRepository extends GenericRepository<DimEstudiante> {
  constructor() {
    super("/DimEstudiante");
  }
}
const dimEstudianteRepository = new DimEstudianteRepository();

export default dimEstudianteRepository;