import { createHorarioSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createHorario } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateHorario } from "@/types";

type FormsFields = z.infer<typeof createHorarioSchema>;

const useCreateHorario = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createHorarioSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createHorario(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Horario"],
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
    closeErrorModal,
    errorMessage,
    isOpen,
    setIsOpen,
    errors,
    onSubmit,
  };
};

export default useCreateHorario;

export const convertToFormData = (horario: any): CreateHorario => {
  return {
    fechaInicio: horario.fechaInicio,
    fechaFin: horario.fechaFin,
    idDocente: parseInt(horario.idDocente),
    idCurso: parseInt(horario.idCurso)
  };
};
