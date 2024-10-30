import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { ProgramaAcademico } from "@/types";

class ProgramaAcademicoRepository extends GenericRepository<ProgramaAcademico> {
  constructor() {
    super("/ProgramaAcademico");
  }
}
const programaAcademicoRepository = new ProgramaAcademicoRepository();

export default programaAcademicoRepository;
