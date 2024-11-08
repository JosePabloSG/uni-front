import { updateCursoSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCurso } from "@/services";
import { UpdateCurso } from "@/types";

type FormsFields = z.infer<typeof updateCursoSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  cursoId: number;
}

const useUpdateCurso = ({ setIsOpen, cursoId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateCursoSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateCurso) => updateCurso(cursoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cursos"],
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

export default useUpdateCurso;


export const convertToFormData = (curso: any): UpdateCurso => {
  return {
    Nombre: curso.Nombre,
    CodigoCurso: curso.CodigoCurso,
    Creditos: curso.Creditos,
    HorasSemana: curso.HorasSemana,
    IdProgAcademico: curso.IdProgAcademico,
  };
};
