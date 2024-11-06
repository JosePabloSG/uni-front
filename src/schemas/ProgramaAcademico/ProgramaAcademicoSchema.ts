import { z } from "zod";

export const createProgramaAcademicoSchema = z.object({
  nombrePrograma: z.string(),
  Duracion: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  IdNivelAcademico: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  IdFacultad: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
});

export const updateProgramaAcademicoSchema = z.object({
  nombrePrograma: z.string().optional(),
  Duracion:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
  IdNivelAcademico:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
  IdFacultad:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
});
