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
import { useCreateHorario, useGetAllCurso } from "@/hooks";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import ErrorModal from "@/components/ui/error-modal";
  

export default function AddHorarioModal() {
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
  } = useCreateHorario();
  const { cursos } = useGetAllCurso();
  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        Agregar Horario
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Horario</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fechaInicio">Fecha Inicio</Label>
                <Input id="fechaInicio" type="datetime-local" {...register("fechaInicio")} />
                {errors.fechaInicio && (
                  <p className="text-red-500 text-xs">{errors.fechaInicio.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fechaFin">Fecha Fin</Label>
                <Input id="fechaFin" type="datetime-local" {...register("fechaFin")} />
                {errors.fechaFin && (
                  <p className="text-red-500 text-xs">{errors.fechaFin.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="idDocente">ID Docente</Label>
                <Input id="idDocente" type="number" {...register("idDocente")} />
                {errors.idDocente && (
                  <p className="text-red-500 text-xs">{errors.idDocente.message}</p>
                )}
              </div>

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
