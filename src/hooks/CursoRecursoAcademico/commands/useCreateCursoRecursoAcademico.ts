import { createCursoRecursoAcademicoSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createCursoRecursoAcademico } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCursoRecursoAcademico } from "@/types";

type FormsFields = z.infer<typeof createCursoRecursoAcademicoSchema>;

const useCreateCursoRecursoAcademico = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createCursoRecursoAcademicoSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createCursoRecursoAcademico(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cursoRecursoAcademicos"],
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
    closeErrorModal,
    errorMessage,
    errors,
    onSubmit,
  };
};

export default useCreateCursoRecursoAcademico;

export const convertToFormData = (
  cursoRecursoAcademico: any
): CreateCursoRecursoAcademico => {
  return {
    idCurso: cursoRecursoAcademico.idCurso,
    idRecursoAcademico: cursoRecursoAcademico.idRecursoAcademico,
  };
};

