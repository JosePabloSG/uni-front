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
import { Input } from "@/components/ui/input";

export default function AddCursoRecursoAcademicoModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
  } = useCreateCursoRecursoAcademico();

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
                <Label htmlFor="idCurso">ID Curso</Label>
                <Input id="idCurso" {...register("idCurso")} />
                {errors.idCurso && (
                  <p className="text-red-500 text-xs">
                    {errors.idCurso.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idRecursoAcademico">
                  ID Recurso Académico
                </Label>
                <Input id="idRecursoAcademico" {...register("idRecursoAcademico")} />
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
    </>
  );
}
