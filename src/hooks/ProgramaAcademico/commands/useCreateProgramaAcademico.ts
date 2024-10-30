import { createProgramaAcademicoSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createProgramaAcademico } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProgramaAcademico } from "@/types";

type FormsFields = z.infer<typeof createProgramaAcademicoSchema>;

const useCreateProgramaAcademico = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createProgramaAcademicoSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createProgramaAcademico(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["programaAcademico"],
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
  };
};

export default useCreateProgramaAcademico;

export const convertToFormData = (programaAcademico: any): CreateProgramaAcademico => {
  return {
    idProgAcademico: parseInt(programaAcademico.idProgAcademico),
    nombrePrograma: programaAcademico.nombrePrograma,
    duracion: programaAcademico.duracion,
    idNivelAcademico: parseInt(programaAcademico.idNivelAcademico),
    idFacultad: parseInt(programaAcademico.idFacultad),
  };
};