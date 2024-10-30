import { z } from "zod";

export const createProgramaAcademicoSchema = z.object({
  idProgAcademico: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  nombrePrograma: z.string(),
  duracion: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  idNivelAcademico: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  idFacultad: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
});

export const updateProgramaAcademicoSchema = z.object({
  idProgAcademico:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
  nombrePrograma: z.string().optional(),
  duracion:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
  idNivelAcademico:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
  idFacultad:z.preprocess((value) => Number(value), z.number().min(1).max(100)).optional(),
});
