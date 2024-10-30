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
import useUpdateProgramaAcademico from "@/hooks/ProgramaAcademico/commands/useUpdateProgramaAcademico";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  programaAcademico: any;
  programaAcademicoId: number;
}

export default function EditProgramaAcademicoModal({
  programaAcademicoId,
  programaAcademico,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } =
    useUpdateProgramaAcademico({
      setIsOpen: setIsEditModalOpen,
      programaAcademicoId: programaAcademicoId,
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
            <DialogTitle>Editar Programa Académico</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombrePrograma">Nombre</Label>
                <Input
                  defaultValue={programaAcademico.nombrePrograma}
                  id="nombrePrograma"
                  {...register("nombrePrograma")}
                />
                {errors.nombrePrograma && (
                  <p className="text-red-500 text-xs">
                    {errors.nombrePrograma.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Duracion">Duración</Label>
                <Input
                  defaultValue={programaAcademico.Duracion}
                  id="Duracion"
                  {...register("Duracion")}
                />
                {errors.Duracion && (
                  <p className="text-red-500 text-xs">
                    {errors.Duracion.message}
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
