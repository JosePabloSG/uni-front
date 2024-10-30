
import { updateFacultadSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFacultad } from "@/services";
import { Facultad } from "@/types";

type FormsFields = z.infer<typeof updateFacultadSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  facultadId: number;
}

const useUpdateFacultad = ({ setIsOpen, facultadId }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormsFields>({
    resolver: zodResolver(updateFacultadSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Facultad) => updateFacultad(facultadId, data),
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

export default useUpdateFacultad;

export const convertToFormData = (facultad: any): Facultad => {
  return {
    idFacultad: facultad.idFacultad,
    nombreFacultad: facultad.nombreFacultad,
  };
};