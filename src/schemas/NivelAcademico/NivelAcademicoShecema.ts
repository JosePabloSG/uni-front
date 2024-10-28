import { z } from "zod";

export const createNivelAcademicoSchema = z.object({
  idNivelAcademico: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  nombreNivelAcademico: z.string().min(2).max(50),
});

export const updateNivelAcademicoSchema = z.object({
  idNivelAcademico: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  nombreNivelAcademico: z.string().min(2).max(50),
});
