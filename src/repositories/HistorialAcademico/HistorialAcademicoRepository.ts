import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { HistorialAcademico } from "@/types";

class HistorialAcademicoRepository extends GenericRepository<HistorialAcademico> {
  constructor() {
    super("/HistorialAcademico");
  }
}
const historialacademicoRepository = new HistorialAcademicoRepository();

export default historialacademicoRepository;
