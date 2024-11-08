import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useCreateCursoRecursoAcademico from "@/hooks/CursoRecursoAcademico/commands/useCreateCursoRecursoAcademico";
import { Plus } from "lucide-react";
import { useGetAllCurso, useGetAllRecursosAcademicos } from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorModal from "@/components/ui/error-modal";

export default function AddCursoRecursoAcademicoModal() {
  const {
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    setValue,
    errorMessage,
    closeErrorModal,
  } = useCreateCursoRecursoAcademico();
  const { cursos } = useGetAllCurso();
  const { recursosAcademicos } = useGetAllRecursosAcademicos();

  return (
    <>  
      <Button onClick={handleAddNew} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Agregar
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Curso Recurso Académico</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="idCurso">Curso</Label>
                <Select
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
                <Label htmlFor="idRecursoAcademico">Recurso Académico</Label>
                <Select
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
                {errors.idRecursoAcademico && (
                  <p className="text-red-500 text-xs">
                    {errors.idRecursoAcademico.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Agregar</Button>
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
