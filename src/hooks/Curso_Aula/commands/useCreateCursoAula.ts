import {  createCursoAulaSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createCursoAula } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCursoAula } from "@/types";

type FormsFields = z.infer<typeof createCursoAulaSchema>;

const useCreateCursoAula = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createCursoAulaSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createCursoAula(data),
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
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    onSubmit,
  };
};

export default useCreateCursoAula;

export const convertToFormData = (cursoaula: any): CreateCursoAula => {
  return {
    idCurso: cursoaula.idCurso,
    idAula: cursoaula.idAula,
    horarioClase: cursoaula.horarioClase,
    idCursoNavigation: cursoaula.idCursoNavigation,
    idAulaNavigation: cursoaula.idAulaNavigation,
  };
};
