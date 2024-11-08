"use client";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateHistorialAcademico } from "@/types";
import { updateHistorialAcademicoSchema } from "@/schemas/HistorialAcademico/HistorialAcademicoSchema";
import { updateHistorialAcademico } from "@/services";

type FormsFields = z.infer<typeof updateHistorialAcademicoSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  historialAcademicoId: number;
}

const useUpdateHistorialAcademico = ({ setIsOpen, historialAcademicoId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateHistorialAcademicoSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateHistorialAcademico) => updateHistorialAcademico(historialAcademicoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["historialAcademico"],
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
      setErrorMessage("Failed to update historial académico.");
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
    closeErrorModal,
    onSubmit,
    register,
    mutation,
    errors,
    setError,
  };
};

export default useUpdateHistorialAcademico;

export const convertToFormData = (historialacademico: any): UpdateHistorialAcademico => {
  return {
    nota: parseInt(historialacademico.nota),
    nombreCurso: historialacademico.nombreCurso,
    nombreCompletoEstudiante: historialacademico.nombreCompletoEstudiante,
    emailEstudiante: historialacademico.emailEstudiante,
    telefonoEstudiante: historialacademico.telefonoEstudiante,
    idProgAcademico: parseInt(historialacademico.idProgAcademico),
    nombrePrograma: historialacademico.nombrePrograma,
    idFacultad: parseInt(historialacademico.idFacultad),
    nombreFacultad: historialacademico.nombreFacultad,
    idDocente: parseInt(historialacademico.idDocente),
    nombreCompletoDocente: historialacademico.nombreCompletoDocente,
    fechaCalificacion: historialacademico.fechaCalificacion,
    idCurso: parseInt(historialacademico.idCurso),
    idEstudiante: parseInt(historialacademico.dEstudiante),
  };
};
