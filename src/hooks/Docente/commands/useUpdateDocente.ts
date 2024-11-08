import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateDocente } from "@/types";
import { updateDocenteSchema } from "@/schemas";
import { updateDocente } from "@/services";

type FormsFields = z.infer<typeof updateDocenteSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  docenteId: number;
}

const useUpdateDocente = ({ setIsOpen, docenteId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateDocenteSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateDocente) => updateDocente(docenteId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["docente"],
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
      setErrorMessage("Error al actualizar el docente");
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

export default useUpdateDocente;

export const convertToFormData = (docente: any): UpdateDocente => {
  return {
    nombre: docente.nombre,
    apellido1: docente.apellido1,
    apellido2: docente.apellido2,
    email: docente.email,
    especialidad: docente.especialidad,
    telefono: docente.telefono,
    direccion: docente.direccion,
  };
};