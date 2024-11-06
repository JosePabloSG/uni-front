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
import { useUpdateCursoAula } from "@/hooks";
import { CursoAula } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  cursoaula: CursoAula;
  cursoaulaId: number;
}

export default function EditCursoAulaModal({ cursoaulaId, cursoaula }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } = useUpdateCursoAula({
    setIsOpen: setIsEditModalOpen,
    cursoAulaId: cursoaulaId,
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
                <Label htmlFor="horarioClase"> Horario de Clase</Label>
                <Input
                  defaultValue={cursoaula.horarioClase}
                  id="horarioClase"
                  {...register("horarioClase")}
                />
                {errors.horarioClase && (
                  <p className="text-red-500 text-xs">
                    {errors.horarioClase.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idCurso"> Id del Curso </Label>
                <Input
                  defaultValue={cursoaula.idCurso}
                  id="idCurso"
                  {...register("idCurso")}
                />
                {errors.idCurso && (
                  <p className="text-red-500 text-xs">
                    {errors.idCurso.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="idAula">Id de la Aula</Label>
                <Input
                  defaultValue={cursoaula.idAula}
                  id="idAula"
                  {...register("idAula")}
                />
                {errors.idAula && (
                  <p className="text-red-500 text-xs">
                    {errors.idAula.message}
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
