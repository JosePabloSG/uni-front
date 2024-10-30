

import { createFacultadSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createFacultad } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFacultad } from "@/types";

type FormsFields = z.infer<typeof createFacultadSchema>;

const useCreateFacultad = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(createFacultadSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (data: FormsFields) => createFacultad(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facultad"],
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

export default useCreateFacultad;

export const convertToFormData = (facultad: any): CreateFacultad => {
  return {
    idFacultad: parseInt(facultad.idFacultad),
    nombreFacultad: facultad.nombreFacultad,
  };
};


