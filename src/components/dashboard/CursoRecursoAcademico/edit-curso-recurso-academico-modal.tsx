import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ErrorModal from "@/components/ui/error-modal";
import { Label } from "@/components/ui/label";
import useUpdateCursoRecursoAcademico from "@/hooks/CursoRecursoAcademico/commands/useUpdateCursoRecursoAcademico";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useGetAllCurso, useGetAllRecursosAcademicos } from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  cursoRecursoAcademico: any;
  cursoRecursoAcademicoId: number;
}

export default function EditCursoRecursoAcademicoModal({
  cursoRecursoAcademicoId,
  cursoRecursoAcademico,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    errors,
    handleSubmit,
    onSubmit,
    errorMessage,
    setValue,
    closeErrorModal,
  } = useUpdateCursoRecursoAcademico({
    setIsOpen: setIsEditModalOpen,
    cursoRecursoAcademicoId: cursoRecursoAcademicoId,
  });
  const { cursos } = useGetAllCurso();
  const { recursosAcademicos } = useGetAllRecursosAcademicos();

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
            <DialogTitle>Editar Curso Recurso Académico</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="idCurso">Curso</Label>
                <Select
                  defaultValue={cursoRecursoAcademico.idCurso?.toString()}
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
                <Label htmlFor="idRecursoAcademico">Recurso Académico</Label>
                <Select
                  defaultValue={cursoRecursoAcademico.idRecursoAcademico?.toString()}
                  onValueChange={(value) =>
                    setValue("idRecursoAcademico", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un recurso académico" />
                  </SelectTrigger>
                  <SelectContent>
                    {recursosAcademicos &&
                      recursosAcademicos.map((recurso) => (
                        <SelectItem
                          key={recurso?.idRecursoAcademico}
                          value={(recurso?.idRecursoAcademico ?? "").toString()}
                        >
                          {recurso?.tipo}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
