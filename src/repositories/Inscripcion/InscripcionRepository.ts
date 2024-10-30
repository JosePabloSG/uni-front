
import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { Inscripcion } from "@/types";

class InscripcionRepository extends GenericRepository<Inscripcion> {
  constructor() {
    super("/Inscripcion");
  }
}
const inscripcionRepository = new InscripcionRepository();

export default inscripcionRepository;