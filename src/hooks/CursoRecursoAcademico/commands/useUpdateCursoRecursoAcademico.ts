import { updateCursoRecursoAcademicoSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCursoRecursoAcademico } from "@/services";
import { UpdateCursoRecursoAcademico } from "@/types";

type FormsFields = z.infer<typeof updateCursoRecursoAcademicoSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  cursoRecursoAcademicoId: number;
}

const useUpdateCursoRecursoAcademico = ({
  setIsOpen,
  cursoRecursoAcademicoId,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateCursoRecursoAcademicoSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateCursoRecursoAcademico) =>
      updateCursoRecursoAcademico(cursoRecursoAcademicoId, data),
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
    setIsOpen,
    errorMessage,
    handleSubmit,
    setValue,
    setErrorMessage,
    onSubmit,
    register,
    closeErrorModal,
    mutation,
    errors,
    setError,
  };
};

export default useUpdateCursoRecursoAcademico;

export const convertToFormData = (
  cursoRecursoAcademico: any
): UpdateCursoRecursoAcademico => {
  return {
    idCurso: cursoRecursoAcademico.idCurso,
    idRecursoAcademico: cursoRecursoAcademico.idRecursoAcademico,
  };
};
