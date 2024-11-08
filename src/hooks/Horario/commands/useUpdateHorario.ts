import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateHorarioSchema } from "@/schemas";
import { updateHorario } from "@/services";
import { UpdateHorario } from "@/types";

type FormsFields = z.infer<typeof updateHorarioSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  horarioId: number;
}

const useUpdateHorario = ({ setIsOpen, horarioId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateHorarioSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateHorario) => updateHorario(horarioId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Horario"],
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

export default useUpdateHorario;

export const convertToFormData = (horario: any): UpdateHorario => {
  return {
    fechaInicio: horario.fechaInicio,
    fechaFin: horario.fechaFin,
    idDocente: horario.idDocente,
    idCurso: horario.idCurso,
  };
};
