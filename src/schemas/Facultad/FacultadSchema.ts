import { z } from "zod";

export const createFacultadSchema = z.object({
  idFacultad:z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  nombreFacultad: z.string(),
});


export const updateFacultadSchema = z.object({
  idFacultad:z.preprocess((value) => Number(value), z.number().min(1).max(100)),
  nombreFacultad: z.string().optional(),
});