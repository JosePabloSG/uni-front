import { z } from "zod";

export const createCursoRecursoAcademicoSchema = z.object({
  idCurso: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  idRecursoAcademico: z.preprocess(
    (value) => Number(value),
    z.number().min(1).max(100)
  ),
});

export const updateCursoRecursoAcademicoSchema = z.object({
  idCurso: z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  idRecursoAcademico: z.preprocess(
    (value) => Number(value),
    z.number().min(1).max(100)
  ),
});
