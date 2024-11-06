import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateProgramaAcademico from "@/hooks/ProgramaAcademico/commands/useCreateProgramaAcademico";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllFacultad, useGetAllNivelAcademico } from "@/hooks";

export default function AddProgramaAcademicoModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    setValue,
    errors,
  } = useCreateProgramaAcademico();
  const { nivelAcademicos } = useGetAllNivelAcademico();
  const { facultad } = useGetAllFacultad();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Agregar
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Programa Académico</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombrePrograma">Nombre</Label>
                <Input id="nombrePrograma" {...register("nombrePrograma")} />
                {errors.nombrePrograma && (
                  <p className="text-red-500 text-xs">
                    {errors.nombrePrograma.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Duracion">Duración</Label>
                <Input id="Duracion" type="number" {...register("Duracion")} />
                {errors.Duracion && (
                  <p className="text-red-500 text-xs">
                    {errors.Duracion.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="IdNivelAcademico">Nivel Académico</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("IdNivelAcademico", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un nivel académico" />
                  </SelectTrigger>
                  <SelectContent>
                    {nivelAcademicos &&
                      nivelAcademicos.map((nivelAcademico) => (
                        <SelectItem
                          key={nivelAcademico?.idNivelAcademico}
                          value={(
                            nivelAcademico?.idNivelAcademico ?? ""
                          ).toString()}
                        >
                          {nivelAcademico?.nombreNivelAcademico}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.IdNivelAcademico && (
                  <p className="text-red-500 text-xs">
                    {errors.IdNivelAcademico.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idFacultad">Facultad</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("IdFacultad", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar una facultad" />
                  </SelectTrigger>
                  <SelectContent>
                    {facultad &&
                      facultad.map((facultad) => (
                        <SelectItem
                          key={facultad?.idFacultad}
                          value={(facultad?.idFacultad ?? "").toString()}
                        >
                          {facultad?.nombreFacultad}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.IdFacultad && (
                  <p className="text-red-500 text-xs">
                    {errors.IdFacultad.message}
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
