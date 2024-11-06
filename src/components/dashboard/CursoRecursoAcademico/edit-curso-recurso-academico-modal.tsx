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
import useUpdateCursoRecursoAcademico from "@/hooks/CursoRecursoAcademico/commands/useUpdateCursoRecursoAcademico";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  cursoRecursoAcademico: any;
  cursoRecursoAcademicoId: number;
}

export default function EditCursoRecursoAcademicoModal({
  cursoRecursoAcademicoId,
  cursoRecursoAcademico,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } =
    useUpdateCursoRecursoAcademico({
      setIsOpen: setIsEditModalOpen,
      cursoRecursoAcademicoId: cursoRecursoAcademicoId,
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
            <DialogTitle>Editar Curso Recurso Académico</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="idCurso">ID Curso</Label>
                <Input
                  defaultValue={cursoRecursoAcademico.idCurso}
                  id="idCurso"
                  {...register("idCurso")}
                />
                {errors.idCurso && (
                  <p className="text-red-500 text-xs">
                    {errors.idCurso.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idRecursoAcademico">
                  ID Recurso Académico
                </Label>
                <Input
                  defaultValue={cursoRecursoAcademico.idRecursoAcademico}
                  id="idRecursoAcademico"
                  {...register("idRecursoAcademico")}
                />
                {errors.idRecursoAcademico && (
                  <p className="text-red-500 text-xs">
                    {errors.idRecursoAcademico.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}