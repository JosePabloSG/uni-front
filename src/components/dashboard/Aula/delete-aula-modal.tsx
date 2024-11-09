import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react"; // Importa useSession
import ErrorModal from "@/components/ui/error-modal";
import useDeleteAula from "@/hooks/Aula/commands/useDeleteAula"; // Asegúrate de importar correctamente el hook

interface Props {
  id: number; // `id` ahora es requerido
}

export default function DeleteAulaModal({ id }: Props) {
  const { data: session } = useSession();
  const idUsuario = Number(session?.user?.employeeId) || 0;

  const {
    handleDeleteAula, // Renombrado a la función correcta del hook
    isOpen,
    setIsOpen,
    errorMessage,
    closeErrorModal,
  } = useDeleteAula(idUsuario);

  const confirmDelete = async () => {
    await handleDeleteAula(id); // Usa `id` pasado como prop al componente
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar esta aula? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {errorMessage && (
        <ErrorModal
          isOpen={!!errorMessage}
          onClose={closeErrorModal}
          message={errorMessage}
        />
      )}
    </>
  );
}
