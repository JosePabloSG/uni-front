import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useGetAllCurso,
  useGetAllEstudiante,
  useUpdateInscripcion,
} from "@/hooks";
import { Inscripcion } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ErrorModal from "@/components/ui/error-modal";

interface Props {
  inscripcion: Inscripcion;
  inscripcionId: number;
}

export default function EditInscripcionModal({
  inscripcionId,
  inscripcion,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    errorMessage,
    closeErrorModal,
  } = useUpdateInscripcion({
    setIsOpen: setIsEditModalOpen,
    inscripcionId: inscripcionId,
  });
  const { cursos } = useGetAllCurso();
  const { estudiante } = useGetAllEstudiante();

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
            <DialogTitle>Editar Inscripción</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="idCurso">Curso</Label>
                <Select
                  defaultValue={inscripcion.idCurso?.toString()}
                  onValueChange={(value) => setValue("idCurso", Number(value))}
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
                <Label htmlFor="idEstudiante">Estudiante</Label>
                <Select
                  defaultValue={inscripcion.idEstudiante?.toString()}
                  onValueChange={(value) =>
                    setValue("idEstudiante", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un estudiante" />
                  </SelectTrigger>
                  <SelectContent>
                    {estudiante &&
                      estudiante.map((estudiante) => (
                        <SelectItem
                          key={estudiante?.idEstudiante}
                          value={(estudiante?.idEstudiante ?? "").toString()}
                        >
                          {estudiante?.nombre +
                            " " +
                            estudiante?.apellido1 +
                            " " +
                            estudiante?.apellido2}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.idEstudiante && (
                  <p className="text-red-500 text-xs">
                    {errors.idEstudiante.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter className="mt-4">
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
