import { createEstudianteSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createEstudiante } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEstudiante } from "@/types";

type FormsFields = z.infer<typeof createEstudianteSchema>;

const useCreateEstudiante = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createEstudianteSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createEstudiante(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["estudiante"],
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
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

  const closeErrorModal = () => {
    setErrorMessage(null);
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
    errorMessage,
    closeErrorModal,
  };
};

export default useCreateEstudiante;

export const convertToFormData = (estudiante: any): CreateEstudiante => {
  return {
    nombre: estudiante.nombre,
    apellido1: estudiante.apellido1,
    apellido2: estudiante.apellido2,
    email: estudiante.email,
    telefono: estudiante.telefono,
    direccion: estudiante.direccion,
  };
};