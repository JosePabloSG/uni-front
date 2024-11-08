import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useCreateCurso from "@/hooks/Curso/commands/useCreateCurso";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import ErrorModal from "@/components/ui/error-modal";

export default function AddCursoModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    errorMessage,
    closeErrorModal,
  } = useCreateCurso();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Agregar
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Curso</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="Nombre">Nombre</Label>
                <Input id="Nombre" {...register("Nombre")} />
                {errors.Nombre && (
                  <p className="text-red-500 text-xs">
                    {errors.Nombre.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="CodigoCurso">Código</Label>
                <Input id="CodigoCurso" {...register("CodigoCurso")} />
                {errors.CodigoCurso && (
                  <p className="text-red-500 text-xs">
                    {errors.CodigoCurso.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Creditos">Creditos</Label>
                <Input id="Creditos" type="number" {...register("Creditos")} />
                {errors.Creditos && (
                  <p className="text-red-500 text-xs">
                    {errors.Creditos.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="HorasSemana">Horas/Semana</Label>
                <Input
                  id="HorasSemana"
                  type="number"
                  {...register("HorasSemana")}
                />
                {errors.HorasSemana && (
                  <p className="text-red-500 text-xs">
                    {errors.HorasSemana.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="IdProgAcademico">ID Programa Académico</Label>
                <Input
                  id="IdProgAcademico"
                  type="number"
                  {...register("IdProgAcademico")}
                />
                {errors.IdProgAcademico && (
                  <p className="text-red-500 text-xs">
                    {errors.IdProgAcademico.message}
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
