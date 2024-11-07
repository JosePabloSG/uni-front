import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateDocenteCurso } from "@/types";
import { updateDocenteCursoSchema } from "@/schemas";
import { updateDocenteCurso } from "@/services";

type FormsFields = z.infer<typeof updateDocenteCursoSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  docenteCursoId: number;
}

const useUpdateDocenteCurso = ({ setIsOpen, docenteCursoId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateDocenteCursoSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateDocenteCurso) => updateDocenteCurso(docenteCursoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["docenteCurso"],
      });
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

export default useUpdateDocenteCurso;

export const convertToFormData = (docenteCurso: any): UpdateDocenteCurso => {
  return {
    idDocente: docenteCurso.idDocente,
    idCurso: docenteCurso.idCurso,
  };
};
