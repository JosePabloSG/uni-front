import { z } from "zod";

export const createCursoSchema = z.object({
  Nombre: z.string(),
  CodigoCurso: z.string(),
  Creditos: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  HorasSemana: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
});

export const updateCursoSchema = z.object({
  Nombre: z.string().optional(),
  CodigoCurso: z.string().optional(),
  Creditos: z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
  HorasSemana: z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
});