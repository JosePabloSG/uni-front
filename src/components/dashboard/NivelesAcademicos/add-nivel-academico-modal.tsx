import useCreateNivelAcademico from "@/hooks/NivelAcademico/commands/useCreateNivelAcademico";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";


export default function AddNivelAcademicoModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
  } = useCreateNivelAcademico();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Agregar
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="idNivelAcademico">ID</Label>
                <Input
                  id="idNivelAcademico"
                  {...register("idNivelAcademico")}
                />
                {errors.idNivelAcademico && (
                  <p className="text-red-500 text-xs">
                    {errors.idNivelAcademico.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="nombreNivelAcademico"
                  {...register("nombreNivelAcademico")}
                />
                {errors.nombreNivelAcademico && (
                  <p className="text-red-500 text-xs">
                    {errors.nombreNivelAcademico.message}
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
