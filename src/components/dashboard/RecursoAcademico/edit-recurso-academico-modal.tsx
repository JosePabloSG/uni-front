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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useUpdateRecursoAcademico from "@/hooks/RecursoAcademico/commands/useUpdateRecursoAcademico";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  recursoAcademico: any;
  recursoAcademicoId: number;
}

export default function EditRecursoAcademicoModal({
  recursoAcademicoId,
  recursoAcademico,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, setValue, errors, handleSubmit, onSubmit } =
    useUpdateRecursoAcademico({
      setIsOpen: setIsEditModalOpen,
      recursoAcademicoId: recursoAcademicoId,
    });

  // Fix: Set default value for "estado" when opening the modal
  useState(() => {
    setValue("estado", recursoAcademico.estado);
  });

  return (
    <>
      <Button
        onClick={() => setIsEditModalOpen(true)}
        variant="outline"
        size="icon"
        className="mr-2"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Recurso Académico</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="estado">Estado</Label>
                <Select
                  value={recursoAcademico.estado} // Set the current estado as default value
                  onValueChange={(value) => setValue("estado", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="No disponible">No disponible</SelectItem>
                  </SelectContent>
                </Select>
                {errors.estado && (
                  <p className="text-red-500 text-xs">
                    {errors.estado.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Input
                  defaultValue={recursoAcademico.tipo}
                  id="tipo"
                  {...register("tipo")}
                />
                {errors.tipo && (
                  <p className="text-red-500 text-xs">
                    {errors.tipo.message}
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
    </>
  );
}
