import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { CursoRecursoAcademico } from "@/types";

class CursoRecursoAcademicoRepository extends GenericRepository<CursoRecursoAcademico> {
  constructor() {
    super("/CursoRecursoAcademico");
  }
}
const cursoRecursoAcademicoRepository = new CursoRecursoAcademicoRepository();

export default cursoRecursoAcademicoRepository;