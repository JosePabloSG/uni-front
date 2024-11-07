import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { DimAula } from "@/types";

class DimAulaRepository extends GenericRepository<DimAula> {
  constructor() {
    super("/DimAula");
  }
}

const dimAulaRepository = new DimAulaRepository();

export default dimAulaRepository;