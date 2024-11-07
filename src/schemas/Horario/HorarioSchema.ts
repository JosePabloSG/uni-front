import { z } from "zod";



export const createHorarioSchema = z.object({
    
  fechaInicio: z.string().min(1, "La fecha de inicio no puede estar vacía"),
  fechaFin: z.string().min(1, "La fecha de fin no puede estar vacía"),
  idDocente: z.preprocess((val) => Number(val), z.number().min(1, "El ID del docente debe ser un número positivo")),
  idCurso: z.preprocess((val) => Number(val), z.number().min(1, "El ID del curso debe ser un número positivo"))
});

export const updateHorarioSchema = z.object({
  fechaInicio: z.string().min(1, "La fecha de inicio no puede estar vacía").optional(),
  fechaFin: z.string().min(1, "La fecha de fin no puede estar vacía").optional(),
  idDocente: z.preprocess((val) => Number(val), z.number().min(1, "El ID del docente debe ser un número positivo")).optional(),
  idCurso: z.preprocess((val) => Number(val), z.number().min(1, "El ID del curso debe ser un número positivo")).optional()
});
