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
import { useUpdateHorario, useGetAllCurso, useGetAllDocente } from "@/hooks";
import { Horario } from "@/types";
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
  horario: Horario;
  horarioId?: number;
}

export default function EditHorarioModal({ horarioId = 0, horario }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { cursos } = useGetAllCurso();
  const { docente } = useGetAllDocente();
  const { register, errors, handleSubmit, onSubmit, setValue, errorMessage, closeErrorModal } = useUpdateHorario({
    setIsOpen: setIsEditModalOpen,
    horarioId: horarioId,
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
            <DialogTitle>Editar Horario</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fechaInicio">Fecha Inicio</Label>
                <Input
                  defaultValue={horario.fechaInicio}
                  id="fechaInicio"
                  type="datetime-local"
                  {...register("fechaInicio")}
                />
                {errors.fechaInicio && (
                  <p className="text-red-500 text-xs">
                    {errors.fechaInicio.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fechaFin">Fecha Fin</Label>
                <Input
                  defaultValue={horario.fechaFin}
                  id="fechaFin"
                  type="datetime-local"
                  {...register("fechaFin")}
                />
                {errors.fechaFin && (
                  <p className="text-red-500 text-xs">
                    {errors.fechaFin.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idDocente">Docente</Label>
                <Select
                  defaultValue={horario.idDocente?.toString()}
                  onValueChange={(value) =>
                    setValue("idDocente", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un docente" />
                  </SelectTrigger>
                  <SelectContent>
                    {docente &&
                      docente.map((docente) => (
                        <SelectItem
                          key={docente?.idDocente}
                          value={(docente?.idDocente ?? "").toString()}
                        >
                          {docente?.nombreCompletoDocente}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.idDocente && (
                  <p className="text-red-500 text-xs">
                    {errors.idDocente.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idCurso">Curso</Label>
                <Select
                  defaultValue={horario.idCurso?.toString()}
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
