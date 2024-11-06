
import { aulaRepository } from "@/repositories";

export const getAllAula = () => { 
  return aulaRepository.getAll();
};
