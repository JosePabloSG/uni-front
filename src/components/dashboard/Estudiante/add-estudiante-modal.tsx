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
import { useCreateEstudiante } from "@/hooks";
import ErrorModal from "@/components/ui/error-modal";

export default function AddEstudianteModal() {
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
  } = useCreateEstudiante();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        Agregar Estudiante
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Estudiante</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
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
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" {...register("telefono")} />
                {errors.telefono && (
                  <p className="text-red-500 text-xs">{errors.telefono.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" {...register("direccion")} />
                {errors.direccion && (
                  <p className="text-red-500 text-xs">{errors.direccion.message}</p>
                )}
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Guardar Cambios</Button>
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