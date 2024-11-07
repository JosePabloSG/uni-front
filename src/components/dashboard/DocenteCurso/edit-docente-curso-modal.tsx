import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateDocenteCurso } from "@/hooks";
import { DocenteCurso } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  docenteCurso: DocenteCurso;
  docenteCursoId: number;
}

export default function EditDocenteCursoModal({
  docenteCursoId,
  docenteCurso,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } = useUpdateDocenteCurso({
    setIsOpen: setIsEditModalOpen,
    docenteCursoId: docenteCursoId,
  });

  return (
    <>
      <Button
        onClick={() => setIsEditModalOpen(true)}
        variant="outline"
        size="icon"
        className="mr-2"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Docente</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="idDocente">ID Docente</Label>
                <Input
                  defaultValue={docenteCurso.idDocente}
                  id="idDocente"
                  {...register("idDocente")}
                />
                {errors.idDocente && (
                  <p className="text-red-500 text-xs">
                    {errors.idDocente.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="idCurso">ID Curso</Label>
                <Input
                  defaultValue={docenteCurso.idCurso}
                  id="idCurso"
                  {...register("idCurso")}
                />
                {errors.idCurso && (
                  <p className="text-red-500 text-xs">
                    {errors.idCurso.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
