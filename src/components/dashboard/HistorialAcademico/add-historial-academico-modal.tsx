import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  useCreateHistorialAcademico,
  useGetAllCurso,
  useGetAllEstudiante,
} from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorModal from "@/components/ui/error-modal";
import { Input } from "@/components/ui/input";

export default function AddHistorialAcademicoModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    setValue,
    errorMessage,
    closeErrorModal,
  } = useCreateHistorialAcademico();
  const { cursos } = useGetAllCurso();
  const { estudiante } = useGetAllEstudiante();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        Agregar Historial Académico
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Historial Académico</DialogTitle>
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

              {/* Nombre Completo del Estudiante */}
              <div className="grid gap-2">
                <Label htmlFor="idEstudiante">Estudiante</Label>
                <Select
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
              {/* Nota del Estudiante */}
              <div className="grid gap-2">
                <Label htmlFor="nota">Nota del Estudiante</Label>
                <Input id="nota" type="number" {...register("nota")} />
                {errors.nota && (
                  <p className="text-red-500 text-xs">{errors.nota.message}</p>
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
