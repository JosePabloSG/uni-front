import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { DimRecursoAcademico } from "@/types";

class DimRecursoAcademicoRepository extends GenericRepository<DimRecursoAcademico> {
  constructor() {
    super("/DimRecursoAcademico");
  }
}

const dimRecursoAcademicoRepository = new DimRecursoAcademicoRepository();

export default dimRecursoAcademicoRepository;