import { z } from "zod";

export const createInscripcionSchema = z.object({
  idEstudiante: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  idCurso: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  estado: z.string(),
});

export const updateInscripcionSchema = z.object({
  idInscripcion: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  nuevoEstado: z.string().optional(),
});
