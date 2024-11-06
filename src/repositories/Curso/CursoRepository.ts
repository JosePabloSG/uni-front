import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { Curso } from "@/types";

class CursoRepository extends GenericRepository<Curso> {
  constructor() {
    super("/Curso");
  }
}
const cursoRepository = new CursoRepository();

export default cursoRepository;
