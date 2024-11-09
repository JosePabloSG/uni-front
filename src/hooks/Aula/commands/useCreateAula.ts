import { createAulaSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createAula } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAula } from "@/types";

type FormsFields = z.infer<typeof createAulaSchema>;

const useCreateAula = (idUsuario: number) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createAulaSchema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createAula({ ...data, IdUsuario: idUsuario }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Aula"],
      });
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const formData = convertToFormData(data, idUsuario);
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
    formState: { errors },
    setError,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    errorMessage,
    closeErrorModal,
    onSubmit,
  };
};

export default useCreateAula;

export const convertToFormData = (aula: any, idUsuario: number): CreateAula => {
  return {
    codigoAula: aula.codigoAula,
    capacidad: parseInt(aula.capacidad),
    ubicacion: aula.ubicacion,
    equipamiento: aula.equipamiento,
    IdUsuario: idUsuario,
  };
};
