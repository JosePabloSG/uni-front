'use client';
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
import useUpdateNivelAcademico from "@/hooks/NivelAcademico/commands/useUpdateNivelAcademico";
import { NivelAcademico } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  nivel: NivelAcademico;
  nivelId: number;
}

export default function EditNivelAcademicoModal({ nivelId, nivel }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } = useUpdateNivelAcademico({
    setIsOpen: setIsEditModalOpen,
    nivelId: nivelId,
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
            <DialogTitle>Editar Nivel Académico</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombreNivelAcademico">Nombre</Label>
                <Input
                  defaultValue={nivel.nombreNivelAcademico}
                  id="nombreNivelAcademico"
                  {...register("nombreNivelAcademico")}
                />
                {errors.nombreNivelAcademico && (
                  <p className="text-red-500 text-xs">
                    {errors.nombreNivelAcademico.message}
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
