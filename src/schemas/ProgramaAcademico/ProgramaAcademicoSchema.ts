import { z } from "zod";

export const createProgramaAcademicoSchema = z.object({
  nombrePrograma: z.string(),
  duracion: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  idNivelAcademico: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  idFacultad: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
});

export const updateProgramaAcademicoSchema = z.object({
  nombrePrograma: z.string().optional(),
  duracion:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
  idNivelAcademico:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
  idFacultad:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
});
