import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { DimTiempo } from "@/types";

class DimTiempoRepository extends GenericRepository<DimTiempo> {
  constructor() {
    super("/DimTiempo");
  }
}

const dimTiempoRepository = new DimTiempoRepository();

export default dimTiempoRepository;