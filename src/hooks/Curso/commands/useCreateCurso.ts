import { createCursoSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createCurso } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCurso } from "@/types";

type FormsFields = z.infer<typeof createCursoSchema>;

const useCreateCurso = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createCursoSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: CreateCurso) => createCurso(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cursos"],
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

export default useCreateCurso;


export const convertToFormData = (curso: any): CreateCurso => {
  return {
    Nombre: curso.Nombre,
    CodigoCurso: curso.CodigoCurso,
    Creditos: curso.Creditos,
    HorasSemana: curso.HorasSemana,
    IdProgAcademico: curso.IdProgAcademico,
  };
};
