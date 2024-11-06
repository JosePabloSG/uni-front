import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { HistorialCambio } from "@/types";

class HistorialCambioRepository extends GenericRepository<HistorialCambio> {
  constructor() {
    super("/HistorialCambio");
  }
}
const historialCambioRepository = new HistorialCambioRepository();

export default historialCambioRepository;
