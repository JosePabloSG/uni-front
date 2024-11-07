import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { HechosCargaDocente } from "@/types";

class HechosCargaDocenteRepository extends GenericRepository<HechosCargaDocente> {
  constructor() {
    super("/HechosCargaDocente");
  }
}

const hechosCargaDocenteRepository = new HechosCargaDocenteRepository();  

export default hechosCargaDocenteRepository;