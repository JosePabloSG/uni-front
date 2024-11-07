import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { HechosDesempeñoAcademico } from "@/types";

class HechosDesempeñoAcademicoRepository extends GenericRepository<HechosDesempeñoAcademico> {
  constructor() {
    super("/HechosDesempeñoAcademico");
  }
}
const hechosDesempeñoAcademicoRepository = new HechosDesempeñoAcademicoRepository();

export default hechosDesempeñoAcademicoRepository;