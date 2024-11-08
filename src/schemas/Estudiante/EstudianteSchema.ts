import { z } from "zod";

export const createEstudianteSchema = z.object({
  nombre: z.string(),
  apellido1: z.string(),
  apellido2: z.string(),
  email: z.string(),
  telefono: z.string(),
  direccion: z.string(),
});

export const updateEstudianteSchema = z.object({
  nombre: z.string().optional(),
  apellido1: z.string().optional(),
  apellido2: z.string().optional(),
  email: z.string().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});