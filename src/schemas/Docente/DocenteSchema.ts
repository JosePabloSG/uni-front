import { z } from "zod";

export const createDocenteSchema = z.object({
  nombre: z.string(),
  apellido1: z.string(),
  apellido2: z.string(),
  email: z.string(),
  especialidad: z.string(),
  telefono: z.string(),
  direccion: z.string(),
});

export const updateDocenteSchema = z.object({
  nombre: z.string().optional(),
  apellido1: z.string().optional(),
  apellido2: z.string().optional(),
  email: z.string().optional(),
  especialidad: z.string().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});