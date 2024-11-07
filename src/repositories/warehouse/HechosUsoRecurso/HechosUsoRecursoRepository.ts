import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { HechosUsoRecurso } from "@/types";

class HechosUsoRecursoRepository extends GenericRepository<HechosUsoRecurso> {
  constructor() {
    super("/HechosUsoRecurso");
  }
}
const hechosUsoRecursoRepository = new HechosUsoRecursoRepository();

export default hechosUsoRecursoRepository;