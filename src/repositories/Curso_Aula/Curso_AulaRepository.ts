import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { CursoAula } from "@/types";

class CursoAulaRepository extends GenericRepository<CursoAula> {
  constructor() {
    super("/CursoAula");
  }
}
const cursoAulaRepository = new CursoAulaRepository();

export default cursoAulaRepository;
