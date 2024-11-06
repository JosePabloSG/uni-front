"use client";
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
import { useUpdateHistorialAcademico } from "@/hooks";
import { HistorialAcademico } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  historial: HistorialAcademico;
  historialAcademicoId: number;
}

export default function EditHistorialAcademicoModal({
  historialAcademicoId,
  historial,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } =
    useUpdateHistorialAcademico({
      setIsOpen: setIsEditModalOpen,
      historialAcademicoId: historialAcademicoId,
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
            <DialogTitle>Editar Historial Académico</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="idHistorialAcademico">ID</Label>
                <Input
                  defaultValue={historial.idHistorialAcademico}
                  id="idHistorialAcademico"
                  {...register("idHistorial")}
                />
                {errors.idHistorial && (
                  <p className="text-red-500 text-xs">
                    {errors.idHistorial.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="nota">Nota del Estudiante</Label>
                <Input
                  defaultValue={historial.nota}
                  id="nota"
                  {...register("nota")}
                />
                {errors.nota && (
                  <p className="text-red-500 text-xs">{errors.nota.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fechaCalificacion">Fecha de Calificación</Label>
                <Input
                  defaultValue={historial.fechaCalificacion}
                  id="fechaCalificacion"
                  {...register("fechaCalificacion")}
                />
                {errors.fechaCalificacion && (
                  <p className="text-red-500 text-xs">{errors.fechaCalificacion.message}</p>
                )}
              </div>
            

            </div>
            <DialogFooter>
              <Button  type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
