import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCursoAulaSchema } from "@/schemas";
import { updateCursoAula } from "@/services";
import { UpdateCursoAula } from "@/types";

type FormsFields = z.infer<typeof updateCursoAulaSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  cursoAulaId: number;
}

const useUpdateCursoAula = ({ setIsOpen, cursoAulaId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateCursoAulaSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateCursoAula) => updateCursoAula(cursoAulaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CursoAula"],
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

export default useUpdateCursoAula;

export const convertToFormData = (cursoaula: any): UpdateCursoAula => {
  return {
    
    horarioClase: cursoaula.horarioClase,
    idCurso: cursoaula.idCurso,
    idAula: cursoaula.idAula,
    
  };
};
