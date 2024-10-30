import { z } from "zod";

export const createNivelAcademicoSchema = z.object({
  nombreNivelAcademico: z.string().min(2).max(50),
});

export const updateNivelAcademicoSchema = z.object({
  nombreNivelAcademico: z.string().min(2).max(50),
});
