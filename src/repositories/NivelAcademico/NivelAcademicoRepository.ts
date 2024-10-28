import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { NivelAcademico } from "@/types";

class NivelAcademicoRepository extends GenericRepository<NivelAcademico> {
  constructor() {
    super("/NivelAcademico");
  }
}
const nivelAcademicoRepository = new NivelAcademicoRepository();

export default nivelAcademicoRepository;
