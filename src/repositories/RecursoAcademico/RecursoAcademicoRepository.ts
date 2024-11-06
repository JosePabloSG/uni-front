import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { RecursoAcademico } from "@/types";

class RecursoAcademicoRepository extends GenericRepository<RecursoAcademico> {
  constructor() {
    super("/RecursoAcademico");
  }
}
const recursoAcademicoRepository = new RecursoAcademicoRepository();

export default recursoAcademicoRepository;
