import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAulaSchema } from "@/schemas";
import { updateAula } from "@/services";
import { UpdateAula } from "@/types";

type FormsFields = z.infer<typeof updateAulaSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  aulaId: number;
}

const useUpdateAula = ({ setIsOpen, aulaId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateAulaSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateAula) => updateAula(aulaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Aula"],
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

export default useUpdateAula;

export const convertToFormData = (aula: any): UpdateAula => {
  return {
    codigoAula: aula.codigoAula,
    capacidad: parseInt(aula.capacidad),
    ubicacion: aula.ubicacion,
    equipamiento: aula.equipamiento,
    cursoaula: aula.cursoaula,
  };
};
