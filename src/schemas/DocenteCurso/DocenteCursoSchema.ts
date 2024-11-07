import { z } from "zod";

export const createDocenteCursoSchema = z.object({
  idDocente: z.preprocess((val) => Number(val), z.number().min(1, "El ID del docente debe ser un número positivo")),
  idCurso: z.preprocess((val) => Number(val), z.number().min(1, "El ID del curso debe ser un número positivo")),
});


export const updateDocenteCursoSchema = z.object({
  idDocente: z.preprocess((val) => Number(val), z.number().min(1, "El ID del docente debe ser un número positivo")).optional(),
  idCurso: z.preprocess((val) => Number(val), z.number().min(1, "El ID del curso debe ser un número positivo")).optional(),
});