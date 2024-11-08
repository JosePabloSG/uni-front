
import { createHistorialAcademicoSchema } from "@/schemas/HistorialAcademico/HistorialAcademicoSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateHistorialAcademico } from "@/types";
import { createHistorialAcademico } from "@/services/HistorialAcademico/commands/createHistorialAcademico";

type FormsFields = z.infer<typeof createHistorialAcademicoSchema>;

const useCreateHistorialAcademico = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createHistorialAcademicoSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: CreateHistorialAcademico) => createHistorialAcademico(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["historialAcademico"],
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
    closeErrorModal,
    formState: { errors },
    setError,
    handleAddNew,
    errorMessage,
    closeErrorModal,
    isOpen,
    setIsOpen,
    errors,
    onSubmit,
  };
};

export default useCreateHistorialAcademico;

export const convertToFormData = (historialacademico: any): CreateHistorialAcademico => {
  return {
    IdHistorialAcademico: parseInt(historialacademico.IdHistorialAcademico),
    Nota: parseInt(historialacademico.Nota),
    FechaCalificacion: historialacademico.FechaCalificacion,
    IdCurso: parseInt(historialacademico.IdCurso),
    IdEstudiante: parseInt(historialacademico.IdEstudiante),
  };
};
