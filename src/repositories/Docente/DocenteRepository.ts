import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { Docente } from "@/types";

class DocenteRepository extends GenericRepository<Docente> {
  constructor() {
    super("/Docente");
  }
}
const docenteRepository = new DocenteRepository();

export default docenteRepository;