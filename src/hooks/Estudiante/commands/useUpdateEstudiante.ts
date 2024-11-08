import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEstudianteSchema } from "@/schemas";
import { updateEstudiante } from "@/services";
import { UpdateEstudiante } from "@/types";

type FormsFields = z.infer<typeof updateEstudianteSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  estudianteId: number;
}

const useUpdateEstudiante = ({ setIsOpen, estudianteId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateEstudianteSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateEstudiante) => updateEstudiante(estudianteId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["estudiante"],
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
      setErrorMessage("Error al actualizar el estudiante");
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
    mutation,
    errors,
    closeErrorModal,
    setError,
  };
};

export default useUpdateEstudiante;

export const convertToFormData = (estudiante: any): UpdateEstudiante => {
  return {
    nombre: estudiante.nombre,
    apellido1: estudiante.apellido1,
    apellido2: estudiante.apellido2,
    email: estudiante.email,
    telefono: estudiante.telefono,
    direccion: estudiante.direccion,
  };
};