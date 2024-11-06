import { deleteCurso } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useDeleteCurso = ({ itemId }: { itemId: number }) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (itemId: number) => deleteCurso(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cursos"],
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

export default useDeleteCurso;