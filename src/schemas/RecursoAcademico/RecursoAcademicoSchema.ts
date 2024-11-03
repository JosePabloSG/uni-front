import { z } from "zod";

export const createRecursoAcademicoSchema = z.object({
  estado: z.string(),
  tipo: z.string(),
});

export const updateRecursoAcademicoSchema = z.object({
  estado: z.string().optional(),
  tipo: z.string().optional(),
});
