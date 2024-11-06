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
import useUpdateFacultad from "@/hooks/Facultad/commands/useUpdateFacultad";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  facultadId: number;
  facultad: any;
}

export default function EditFacultadModal({ facultadId, facultad }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } = useUpdateFacultad({
    setIsOpen: setIsEditModalOpen,
    facultadId: facultadId,
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
            <DialogTitle>Editar Facultad</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombreFacultad">Nombre</Label>
                <Input
                  defaultValue={facultad.nombreFacultad}
                  id="nombreFacultad"
                  {...register("nombreFacultad")}
                />
                {errors.nombreFacultad && (
                  <p className="text-red-500 text-xs">
                    {errors.nombreFacultad.message}
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
