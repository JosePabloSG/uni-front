import { updateInscripcionSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateInscripcion } from "@/services";
import { Inscripcion } from "@/types";

type FormsFields = z.infer<typeof updateInscripcionSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  inscripcionId: number;
}

const useUpdateInscripcion = ({ setIsOpen, inscripcionId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateInscripcionSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Inscripcion) => updateInscripcion(inscripcionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inscripcion"],
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

export default useUpdateInscripcion;

export const convertToFormData = (inscripcion: any): Inscripcion => {
  return {
    idInscripcion: inscripcion.idInscripcion,
    fechaInscripcion: inscripcion.fechaInscripcion,
    estado: inscripcion.estado,
    idCurso: inscripcion.idCurso,
    idEstudiante: inscripcion.idEstudiante,
  };
};