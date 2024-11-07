import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { DimCurso } from "@/types";

class DimCursoRepository extends GenericRepository<DimCurso> {
  constructor() {
    super("/DimCurso");
  }
}
const dimCursoRepository = new DimCursoRepository();

export default dimCursoRepository;