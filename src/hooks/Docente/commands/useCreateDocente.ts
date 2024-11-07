import { createDocenteSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createDocente } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDocente } from "@/types";

type FormsFields = z.infer<typeof createDocenteSchema>;

const useCreateDocente = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createDocenteSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createDocente(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["docente"],
      });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const formData = convertToFormData(data);
      await mutation.mutateAsync(formData);
      setIsOpen(false);
    } catch (error) {
      setIsOpen(false);
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    onSubmit,
  };
};

export default useCreateDocente;

export const convertToFormData = (docente: any): CreateDocente => {
  return {
    nombre: docente.nombre,
    apellido1: docente.apellido1,
    apellido2: docente.apellido2,
    email: docente.email,
    especialidad: docente.especialidad,
    telefono: docente.telefono,
    direccion: docente.direccion,
  };
};