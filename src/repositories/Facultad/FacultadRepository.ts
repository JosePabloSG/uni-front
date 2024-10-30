import { GenericRepository } from "@/core/generic-repository/Repository/GenericRepository";
import { Facultad } from "@/types";

class FacultadRepository extends GenericRepository<Facultad> {
  constructor() {
    super("/Facultad");
  }
}
const facultadRepository = new FacultadRepository();

export default facultadRepository;
