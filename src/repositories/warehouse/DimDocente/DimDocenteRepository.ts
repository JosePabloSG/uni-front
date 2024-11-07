import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { DimDocente } from "@/types";

class DimDocenteRepository extends GenericRepository<DimDocente> {
  constructor() {
    super("/DimDocente");
  }
}
const dimDocenteRepository = new DimDocenteRepository();

export default dimDocenteRepository;