import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { DocenteCurso } from "@/types";

class DocenteCursoRepository extends GenericRepository<DocenteCurso> {
  constructor() {
    super("/DocenteCurso");
  }
}
const docenteCursoRepository = new DocenteCursoRepository();

export default docenteCursoRepository;