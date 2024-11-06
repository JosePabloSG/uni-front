import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ErrorModal from "@/components/ui/error-modal";
import useDeleteCursoRecursoAcademico from "@/hooks/CursoRecursoAcademico/commands/useDeleteCursoRecursoAcademico";
import { Trash2 } from "lucide-react";

interface Props {
  id: number;
}

export default function DeleteCursoRecursoAcademicoModal({
  id,
}: Props) {
  const {
    handleDelete,
    isOpen,
    setIsOpen,
    confirmDelete,
    errorMessage,
    closeErrorModal,
  } = useDeleteCursoRecursoAcademico({ itemId: id });
  return (
    <>
      <Button variant="outline" size="icon" onClick={() => handleDelete()}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este departamento? Esta
              acción no se puede deshacer.
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