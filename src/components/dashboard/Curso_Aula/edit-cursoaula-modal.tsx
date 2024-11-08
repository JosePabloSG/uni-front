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
import { useUpdateCursoAula, useGetAllCurso, useGetAllAula } from "@/hooks";
import { CursoAula } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorModal from "@/components/ui/error-modal";

interface Props {
  cursoaula: CursoAula;
  cursoaulaId: number;
}

export default function EditCursoAulaModal({ cursoaulaId, cursoaula }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, setValue, errorMessage, closeErrorModal } = useUpdateCursoAula({
    setIsOpen: setIsEditModalOpen,
    cursoAulaId: cursoaulaId,
  });
  const { cursos } = useGetAllCurso();
  const { aula } = useGetAllAula();

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
                <Label htmlFor="idCurso">Curso</Label>
                <Select
                  defaultValue={cursoaula.idCurso?.toString()}
                  onValueChange={(value) =>
                    setValue("idCurso", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {cursos &&
                      cursos.map((curso) => (
                        <SelectItem
                          key={curso?.idCurso}
                          value={(curso?.idCurso ?? "").toString()}
                        >
                          {curso?.nombre}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.idCurso && (
                  <p className="text-red-500 text-xs">
                    {errors.idCurso.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idAula">Aula</Label>
                <Select
                  defaultValue={cursoaula.idAula?.toString()}
                  onValueChange={(value) =>
                    setValue("idAula", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un aula" />
                  </SelectTrigger>
                  <SelectContent>
                    {aula &&
                      aula.map((aulas) => (
                        <SelectItem
                          key={aulas?.idAula}
                          value={(aulas?.idAula ?? "").toString()}
                        >
                          {aulas?.codigoAula}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
