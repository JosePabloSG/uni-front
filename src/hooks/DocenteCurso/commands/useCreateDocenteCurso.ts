import { createDocenteCursoSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createDocenteCurso } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDocenteCurso } from "@/types";

type FormsFields = z.infer<typeof createDocenteCursoSchema>;

const useCreateDocenteCurso = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createDocenteCursoSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createDocenteCurso(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["docenteCurso"],
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

export default useCreateDocenteCurso;

export const convertToFormData = (docenteCurso: any): CreateDocenteCurso => {
  return {
    idDocente: docenteCurso.idDocente,
    idCurso: docenteCurso.idCurso,
  };
};

