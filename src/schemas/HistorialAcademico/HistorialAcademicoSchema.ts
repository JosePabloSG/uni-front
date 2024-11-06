import { z } from "zod";

export const createHistorialAcademicoSchema = z.object({
  nota: z.preprocess((value) => Number(value), z.number().min(0).max(100)),
  idCurso: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  idEstudiante: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
 
});

export const updateHistorialAcademicoSchema = z.object({
  idHistorial: z.preprocess((value) => Number(value), z.number().min(1).optional()),
  nota: z.preprocess((value) => Number(value), z.number().min(0).max(100)).optional(),
  fechaCalificacion: z.preprocess((value) => new Date(value as string), z.date()).optional(),
});
