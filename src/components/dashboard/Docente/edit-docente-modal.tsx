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
import { useUpdateDocente } from "@/hooks";
import { Docente } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  docente: Docente;
  docenteId: number;
}

export default function EditDocenteModal({ docenteId, docente }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } =
    useUpdateDocente({
      setIsOpen: setIsEditModalOpen,
      docenteId: docenteId,
    });

    function parseNombreCompleto(nombreCompleto: string) {
      const partes = nombreCompleto.split(' ');
      return {
        nombre: partes[0] || '',
        apellido1: partes[1] || '',
        apellido2: partes.slice(2).join(' ') || '',
      };
    }
    
    // Luego, dentro del componente:
    const { nombre, apellido1, apellido2 } = parseNombreCompleto(docente.nombreCompletoDocente || '');
    
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
            <DialogTitle>Editar Docente</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input
                  defaultValue={nombre}
                  id="nombre"
                  {...register("nombre")}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-xs">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="apellido1">Primer Apellido</Label>
                <Input
                  defaultValue={apellido1}
                  id="apellido1"
                  {...register("apellido1")}
                />
                {errors.apellido1 && (
                  <p className="text-red-500 text-xs">
                    {errors.apellido1.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="apellido2">Segundo Apellido</Label>
                <Input
                  defaultValue={apellido2}
                  id="apellido2"
                  {...register("apellido2")}
                />
                {errors.apellido2 && (
                  <p className="text-red-500 text-xs">
                    {errors.apellido2.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  defaultValue={docente.email}
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="especialidad">Especialidad</Label>
                <Input
                  defaultValue={docente.especialidad}
                  id="especialidad"
                  {...register("especialidad")}
                />
                {errors.especialidad && (
                  <p className="text-red-500 text-xs">
                    {errors.especialidad.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  defaultValue={docente.telefono}
                  id="telefono"
                  {...register("telefono")}
                />
                {errors.telefono && (
                  <p className="text-red-500 text-xs">
                    {errors.telefono.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                defaultValue={docente.direccion}
                id="direccion"
                {...register("direccion")}
              />
              {errors.direccion && (
                <p className="text-red-500 text-xs">
                  {errors.direccion.message}
                </p>
              )}
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
