import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCreateInscripcion, useGetAllCurso } from "@/hooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function AddInscripcionModal() {
  const {
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    setValue,
  } = useCreateInscripcion();
  const { cursos } = useGetAllCurso();
  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        Agregar Inscripción
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Inscripción</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 py-4">
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

              {/* <div className="grid gap-2">
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
                    {estudiantes &&
                      estudiantes.map((estudiante: { idEstudiante: Key | null | undefined; nombreCompletoEstudiante: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                        <SelectItem
                          key={estudiante?.idEstudiante}
                          value={(estudiante?.idEstudiante ?? "").toString()}
                        >
                          {estudiante?.nombreCompletoEstudiante}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.idEstudiante && (
                  <p className="text-red-500 text-xs">
                    {errors.idEstudiante.message}
                  </p>
                )}
              </div> */}
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}