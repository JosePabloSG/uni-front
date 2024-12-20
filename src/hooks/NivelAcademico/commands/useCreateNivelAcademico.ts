import { createNivelAcademicoSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createNivelAcademico } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateNivelAcademico } from "@/types";

type FormsFields = z.infer<typeof createNivelAcademicoSchema>;

const useCreateNivelAcademico = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createNivelAcademicoSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createNivelAcademico(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nivelAcademicos"],
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
    isOpen,
    setIsOpen,
    errors,
    onSubmit,
    errorMessage,
  };
};

export default useCreateNivelAcademico;

export const convertToFormData = (nivel: any): CreateNivelAcademico => {
  return {
    nombreNivelAcademico: nivel.nombreNivelAcademico,
  };
};
