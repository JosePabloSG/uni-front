import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { Aula } from "@/types";

class AulaRepository extends GenericRepository<Aula> {
  constructor() {
    super("/Aula");
  }
}
const aulaRepository = new AulaRepository();

export default aulaRepository;
