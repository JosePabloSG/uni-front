import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { HechosInscripcion } from "@/types";

class HechosInscripcionRepository extends GenericRepository<HechosInscripcion> {
  constructor() {
    super("/HechosIncripcione");
  }
}
const hechosInscripcionRepository = new HechosInscripcionRepository();

export default hechosInscripcionRepository;