import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAula } from "@/services/Aula/commands/deleteAula";

const useDeleteAula = (idUsuario: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Mutación para eliminar un aula, pasando idUsuario también
  const mutation = useMutation({
    mutationFn: (idAula: number) => deleteAula(idAula, idUsuario),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Aula"] });
      setIsOpen(false); // Cierra el modal en caso de éxito
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      setIsOpen(false); // Cierra el modal en caso de error
    },
  });

  // Función para manejar la eliminación
  const handleDeleteAula = async (idAula: number) => {
    try {
      await mutation.mutateAsync(idAula);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error desconocido");
      }
      setIsOpen(false);
    }
  };
  
  // Función para abrir el modal de eliminación
  const handleOpenDeleteModal = () => {
    setIsOpen(true);
  };

  // Función para cerrar el modal de error
  const closeErrorModal = () => {
    setErrorMessage(null);
  };

  return {
    handleDeleteAula,
    handleOpenDeleteModal,
    isOpen,
    setIsOpen,
    errorMessage,
    closeErrorModal,
  };
};

export default useDeleteAula;
