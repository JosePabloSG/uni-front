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
import { useCreateHistorialAcademico } from "@/hooks";

export default function AddHistorialAcademicoModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
  } = useCreateHistorialAcademico();

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
              
               {/* Fecha de Calificación */}
               <div className="grid gap-2">
                <Label htmlFor="idCurso">Id Curso</Label>
                <Input id="idCurso" {...register("idCurso")} />
                {errors.idCurso && (
                  <p className="text-red-500 text-xs">{errors.idCurso.message}</p>
                )}
              </div>

              {/* Nombre Completo del Estudiante */}
              <div className="grid gap-2">
                <Label htmlFor="idEstudiante">Id del Estudiante</Label>
                <Input id="idEstudiante" {...register("idEstudiante")} />
                {errors.idEstudiante && (
                  <p className="text-red-500 text-xs">{errors.idEstudiante.message}</p>
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
    </>
  );
}
