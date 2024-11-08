import { updateNivelAcademicoSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNivelAcademico } from "@/services";
import { UpdateNivelAcademico } from "@/types";

type FormsFields = z.infer<typeof updateNivelAcademicoSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  nivelId: number;
}

const useUpdateNivelAcademico = ({ setIsOpen, nivelId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateNivelAcademicoSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateNivelAcademico) => updateNivelAcademico(nivelId, data),
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
    setIsOpen,
    errorMessage,
    handleSubmit,
    closeErrorModal,
    setValue,
    setErrorMessage,
    onSubmit,
    register,
    mutation,
    errors,
    setError,

  };
};

export default useUpdateNivelAcademico;

export const convertToFormData = (nivel: any): UpdateNivelAcademico => {
  return {
    nombreNivelAcademico: nivel.nombreNivelAcademico,
  };
};
