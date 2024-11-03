import { updateRecursoAcademicoSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateRecursoAcademico } from "@/services";
import { UpdateRecursoAcademico } from "@/types";

type FormsFields = z.infer<typeof updateRecursoAcademicoSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  recursoAcademicoId: number;
}

const useUpdateRecursoAcademico = ({ setIsOpen, recursoAcademicoId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateRecursoAcademicoSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateRecursoAcademico) => updateRecursoAcademico(recursoAcademicoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recursosAcademicos"],
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
    setIsOpen,
    errorMessage,
    handleSubmit,
    setValue,
    setErrorMessage,
    onSubmit,
    register,
    mutation,
    errors,
    setError,
  };
};

export default useUpdateRecursoAcademico;

export const convertToFormData = (recursoAcademico: any): UpdateRecursoAcademico => {
  return {
    estado: recursoAcademico.estado,
    tipo: recursoAcademico.tipo,
  };
};

