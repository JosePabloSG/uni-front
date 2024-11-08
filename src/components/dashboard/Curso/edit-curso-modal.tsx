import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ErrorModal from "@/components/ui/error-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateCurso from "@/hooks/Curso/commands/useUpdateCurso";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  curso: any;
  cursoId: number;
}

export default function EditCursoModal({ cursoId, curso }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, errorMessage, closeErrorModal } =
    useUpdateCurso({
      setIsOpen: setIsEditModalOpen,
      cursoId: cursoId,
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
            <DialogTitle>Editar Curso</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="Nombre">Nombre</Label>
                <Input
                  defaultValue={curso.nombre}
                  id="Nombre"
                  {...register("Nombre")}
                />
                {errors.Nombre && (
                  <p className="text-red-500 text-xs">
                    {errors.Nombre.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="CodigoCurso">Código</Label>
                <Input
                  defaultValue={curso.codigoCurso}
                  id="CodigoCurso"
                  {...register("CodigoCurso")}
                />
                {errors.CodigoCurso && (
                  <p className="text-red-500 text-xs">
                    {errors.CodigoCurso.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Creditos">Créditos</Label>
                <Input
                  defaultValue={curso.creditos}
                  id="Creditos"
                  {...register("Creditos")}
                />
                {errors.Creditos && (
                  <p className="text-red-500 text-xs">
                    {errors.Creditos.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="HorasSemana">Horas/Semana</Label>
                <Input
                  defaultValue={curso.horasSemana}
                  id="HorasSemana"
                  {...register("HorasSemana")}
                />
                {errors.HorasSemana && (
                  <p className="text-red-500 text-xs">
                    {errors.HorasSemana.message}
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
