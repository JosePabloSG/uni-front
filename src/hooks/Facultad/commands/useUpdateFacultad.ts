
import { updateFacultadSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFacultad } from "@/services";
import { UpdateFacultad } from "@/types";

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
    mutationFn: (data: UpdateFacultad) => updateFacultad(facultadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facultad"],
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
    closeErrorModal,
    setErrorMessage,
    onSubmit,
    register,
    mutation,
    errors,
    setError,
  };
};

export default useUpdateFacultad;

export const convertToFormData = (facultad: any): UpdateFacultad => {
  return {
    nombreFacultad: facultad.nombreFacultad,
  };
};