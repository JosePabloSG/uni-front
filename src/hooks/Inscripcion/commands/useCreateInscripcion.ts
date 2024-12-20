import { createInscripcionSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createInscripcion } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateInscripcion } from "@/types";

type FormsFields = z.infer<typeof createInscripcionSchema>;

const useCreateInscripcion = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createInscripcionSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createInscripcion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inscripcion"],
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
    closeErrorModal,
    errorMessage,
    formState: { errors },
    setError,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    onSubmit,
  };
};

export default useCreateInscripcion;

export const convertToFormData = (inscripcion: any): CreateInscripcion => {
  return {
    idEstudiante: inscripcion.idEstudiante,
    idCurso: inscripcion.idCurso,
  };
};
