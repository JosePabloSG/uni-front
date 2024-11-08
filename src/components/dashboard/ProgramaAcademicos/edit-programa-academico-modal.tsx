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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllFacultad, useGetAllNivelAcademico } from "@/hooks";
import ErrorModal from "@/components/ui/error-modal";

interface Props {
  programaAcademico: any;
  programaAcademicoId: number;
}

export default function EditProgramaAcademicoModal({
  programaAcademicoId,
  programaAcademico,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit,setValue, closeErrorModal ,errorMessage } =
    useUpdateProgramaAcademico({
      setIsOpen: setIsEditModalOpen,
      programaAcademicoId: programaAcademicoId,
    });
  const { nivelAcademicos } = useGetAllNivelAcademico();
  const { facultad } = useGetAllFacultad();

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
                <Label htmlFor="duracion">Duración</Label>
                <Input
                  defaultValue={programaAcademico.duracion}
                  id="duracion"
                  {...register("duracion")}
                />
                {errors.duracion && (
                  <p className="text-red-500 text-xs">
                    {errors.duracion.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="idFacultad">Facultad</Label>
                <Select
                  defaultValue={programaAcademico.idFacultad?.toString()}
                  onValueChange={(value) =>
                    setValue("idFacultad", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar una facultad" />
                  </SelectTrigger>
                  <SelectContent>
                    {facultad &&
                      facultad.map((facultad) => (
                        <SelectItem
                          key={facultad?.idFacultad}
                          value={(facultad?.idFacultad ?? "").toString()}
                        >
                          {facultad?.nombreFacultad}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.idFacultad && (
                  <p className="text-red-500 text-xs">
                    {errors.idFacultad.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="IdNivelAcademico">Nivel Académico</Label>
                <Select
                  defaultValue={programaAcademico.idNivelAcademico?.toString()}
                  onValueChange={(value) =>
                    setValue("idNivelAcademico", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un nivel académico" />
                  </SelectTrigger>
                  <SelectContent>
                    {nivelAcademicos &&
                      nivelAcademicos.map((nivelAcademico) => (
                        <SelectItem
                          key={nivelAcademico?.idNivelAcademico}
                          value={(
                            nivelAcademico?.idNivelAcademico ?? ""
                          ).toString()}
                        >
                          {nivelAcademico?.nombreNivelAcademico}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.idNivelAcademico && (
                  <p className="text-red-500 text-xs">
                    {errors.idNivelAcademico.message}
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
