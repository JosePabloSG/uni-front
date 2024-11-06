import { z } from "zod";

export const createFacultadSchema = z.object({
  nombreFacultad: z.string(),
});


export const updateFacultadSchema = z.object({
  nombreFacultad: z.string().optional(),
});