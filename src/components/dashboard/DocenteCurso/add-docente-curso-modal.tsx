import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useCreateDocenteCurso,
  useGetAllCurso,
  useGetAllDocente,
} from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorModal from "@/components/ui/error-modal";

export default function AddDocenteCursoModal() {
  const {
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    setValue,
    errorMessage,
    closeErrorModal
  } = useCreateDocenteCurso();
  const { cursos } = useGetAllCurso();
  const { docente } = useGetAllDocente();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        Agregar Docente
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Docente</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 py-4">
              <div className="grid gap-2">
                <Label htmlFor="idCurso">Curso</Label>
                <Select
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
                <Label htmlFor="idDocente">Docente</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("idDocente", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un docente" />
                  </SelectTrigger>
                  <SelectContent>
                    {docente &&
                      docente.map((doc) => (
                        <SelectItem
                          key={doc?.idDocente}
                          value={(doc?.idDocente ?? "").toString()}
                        >
                          {doc?.nombreCompletoDocente}
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
