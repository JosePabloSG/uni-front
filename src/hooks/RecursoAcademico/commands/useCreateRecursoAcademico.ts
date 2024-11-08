import { createRecursoAcademicoSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createRecursoAcademico } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRecursoAcademico } from "@/types";

type FormsFields = z.infer<typeof createRecursoAcademicoSchema>;

const useCreateRecursoAcademico = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createRecursoAcademicoSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createRecursoAcademico(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recursosAcademicos"],
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
    closeErrorModal,
    errorMessage,
    setIsOpen,
    errors,
    onSubmit,
  };
};

export default useCreateRecursoAcademico;

export const convertToFormData = (recursoAcademico: any): CreateRecursoAcademico => {
  return {
    estado: recursoAcademico.estado,
    tipo: recursoAcademico.tipo,
  };
};