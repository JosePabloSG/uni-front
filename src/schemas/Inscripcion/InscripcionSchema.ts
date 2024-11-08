import { z } from "zod"

export const createInscripcionSchema = z.object({
  idEstudiante: z.preprocess((val) => Number(val), z.number().min(1, "El ID del estudiante debe ser un número positivo")),
  idCurso: z.preprocess((val) => Number(val), z.number().min(1, "El ID del curso debe ser un número positivo"))
});

export const updateInscripcionSchema = z.object({ 
  idEstudiante: z.preprocess((val) => Number(val), z.number().min(1, "El ID del estudiante debe ser un número positivo")).optional(),
  idCurso: z.preprocess((val) => Number(val), z.number().min(1, "El ID del curso debe ser un número positivo")).optional(),
  nuevoEstado: z.string().optional()
});