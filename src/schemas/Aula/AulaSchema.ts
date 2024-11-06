import { z } from "zod";

export const aulaSchema = z.object({
  idAula: z.number().min(1), 
  codigoAula: z.string().min(1, "El código del aula no puede estar vacío"), 
  capacidad: z.number().min(1, "La capacidad debe ser al menos 1"), 
  ubicacion: z.string().min(1, "La ubicación no puede estar vacía"), 
  equipamiento: z.string().min(1, "El equipamiento no puede estar vacío"), 
  cursoaula: z.array(z.string()).min(1, "Debe haber al menos un curso asociado"), 
});

export const createAulaSchema = z.object({
  
  codigoAula: z.string().min(1, "El código del aula no puede estar vacío"), 
  capacidad: z.preprocess((val) => Number(val), z.number().min(1, "La capacidad debe ser al menos 1")),  
  ubicacion: z.string().min(1, "La ubicación no puede estar vacía"), 
  equipamiento: z.string().min(1, "El equipamiento no puede estar vacío"), 

});


export const updateAulaSchema = z.object({ 
  codigoAula: z.string().min(1, "El código del aula no puede estar vacío"), 
  capacidad: z.preprocess((val) => Number(val), z.number().min(1, "La capacidad debe ser al menos 1")), 
  ubicacion: z.string().min(1, "La ubicación no puede estar vacía"), 
  equipamiento: z.string().min(1, "El equipamiento no puede estar vacío"), 
});
