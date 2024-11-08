import { updateProgramaAcademicoSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProgramaAcademico } from "@/services";
import {  UpdateProgramaAcademico } from "@/types";

type FormsFields = z.infer<typeof updateProgramaAcademicoSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  programaAcademicoId: number;
}

const useUpdateProgramaAcademico = ({
  setIsOpen,
  programaAcademicoId,
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
    resolver: zodResolver(updateProgramaAcademicoSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateProgramaAcademico) =>
      updateProgramaAcademico(programaAcademicoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["programaAcademico"],
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
    closeErrorModal,
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

export default useUpdateProgramaAcademico;

export const convertToFormData = (
  programaAcademico: any
): UpdateProgramaAcademico => {
  return {
    nombrePrograma: programaAcademico.nombrePrograma, 
    duracion: programaAcademico.duracion,
    idNivelAcademico: programaAcademico.idNivelAcademico,
    idFacultad: programaAcademico.idFacultad,
  };
};
