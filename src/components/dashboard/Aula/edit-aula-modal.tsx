'use client';
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
import { useUpdateAula } from "@/hooks";
import { Aula } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  aula: Aula;
  aulaId?: number;
}

export default function EditAulaModal({ aulaId = 0, aula }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit,errorMessage,closeErrorModal } = useUpdateAula({
    setIsOpen: setIsEditModalOpen,
    aulaId: aulaId,
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
            <DialogTitle>Editar Aula</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="codigoAula">Codigo Aula</Label>
                <Input
                  defaultValue={aula.codigoAula}
                  id="codigoAula"
                  {...register("codigoAula")}
                />
                {errors.codigoAula && (
                  <p className="text-red-500 text-xs">
                    {errors.codigoAula.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="equipamiento"> Equipamiento </Label>
                <Input
                  defaultValue={aula.equipamiento}
                  id="equipamiento"
                  {...register("equipamiento")}
                />
                {errors.equipamiento && (
                  <p className="text-red-500 text-xs">
                    {errors.equipamiento.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="capacidad">Capacidad</Label>
                <Input
                  defaultValue={aula.capacidad}
                  id="capacidad"
                  {...register("capacidad")}
                />
                {errors.capacidad && (
                  <p className="text-red-500 text-xs">
                    {errors.capacidad.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input
                  defaultValue={aula.ubicacion}
                  id="ubicacion"
                  {...register("ubicacion")}
                />
                {errors.ubicacion && (
                  <p className="text-red-500 text-xs">
                    {errors.ubicacion.message}
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
