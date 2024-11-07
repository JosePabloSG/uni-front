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
import { useCreateDocente } from "@/hooks";

export default function AddDocenteModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
  } = useCreateDocente();

  return (
    <>  
      <Button onClick={handleAddNew} className="mb-4">  
        Agregar Docente
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Docente</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" {...register("nombre")} />
                {errors.nombre && (
                  <p className="text-red-500 text-xs">{errors.nombre.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="apellido1">Primer Apellido</Label>
                <Input id="apellido1" {...register("apellido1")} />
                {errors.apellido1 && (
                  <p className="text-red-500 text-xs">{errors.apellido1.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="apellido2">Segundo Apellido</Label>
                <Input id="apellido2" {...register("apellido2")} />
                {errors.apellido2 && (
                  <p className="text-red-500 text-xs">{errors.apellido2.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="especialidad">Especialidad</Label>
                <Input id="especialidad" {...register("especialidad")} />
                {errors.especialidad && (
                  <p className="text-red-500 text-xs">{errors.especialidad.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" {...register("telefono")} />
                {errors.telefono && (
                  <p className="text-red-500 text-xs">{errors.telefono.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input id="direccion" {...register("direccion")} />
              {errors.direccion && (
                <p className="text-red-500 text-xs">{errors.direccion.message}</p>
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
