import { deleteProgramaAcademico } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useDeleteProgramaAcademico = ({ itemId }: { itemId: number }) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (itemId: number) => deleteProgramaAcademico(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["programaAcademico"],
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
  const confirmDelete = async () => {
    try {
      await mutation.mutateAsync(itemId);
      setIsOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async () => {
    setIsOpen(true);
  };

  const closeErrorModal = () => {
    setErrorMessage(null);
  };
  return {
    isOpen,
    handleDelete,
    errorMessage,
    closeErrorModal,
    setIsOpen,
    confirmDelete,
  };
};

export default useDeleteProgramaAcademico;