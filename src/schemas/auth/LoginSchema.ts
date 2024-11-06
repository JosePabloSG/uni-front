import { string, z } from "zod";

export const LoginSchema = z.object({
  idUsuario: z
    .string()
    .min(1, 'El número de identificación es requerido')
    .refine((val) => !isNaN(Number(val)), {
      message:
        'El número de identificación no debe incluir caracteres especiales.',
    }),
    contraseña: string({ required_error: 'La contraseña es requerida' })
    .min(1, 'La contraseña es requerida')
});