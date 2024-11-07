import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { HechosSatisfaccionEstudiantes } from "@/types";

class HechosSatisfaccionEstudiantesRepository extends GenericRepository<HechosSatisfaccionEstudiantes> {
  constructor() {
    super("/HechosSatisfaccionEstudiante");
  }
}

const hechosSatisfaccionEstudiantesRepository = new HechosSatisfaccionEstudiantesRepository();

export default hechosSatisfaccionEstudiantesRepository;