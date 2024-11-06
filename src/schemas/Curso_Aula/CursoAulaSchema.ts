import { z } from "zod";


export const createCursoAulaSchema = z.object({
  idCursoAula: z.number().min(1, "El ID del curso debe ser un número positivo").optional(),
  horarioClase: z.string().min(1, "El horario de clase no puede estar vacío"),
  idCurso: z.preprocess((val) => Number(val), z.number().min(1, "El ID del curso debe ser un número positivo")),
  idAula: z.preprocess((val) => Number(val), z.number().min(1, "El ID del aula debe ser un número positivo")),
 
});


export const updateCursoAulaSchema = z.object({
  horarioClase: z.string().min(1, "El horario de clase no puede estar vacío").optional(),
  idCurso: z.preprocess((val) => Number(val), z.number().min(1, "El ID del curso debe ser un número positivo")).optional(),
  idAula: z.preprocess((val) => Number(val), z.number().min(1, "El ID del aula debe ser un número positivo")).optional(),
  idAulaNavigation: z.number().optional(),
  idCursoNavigation: z.number().optional(),
});
