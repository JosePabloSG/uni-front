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
import { useCreateAula } from "@/hooks";
import ErrorModal from "@/components/ui/error-modal";


export default function AddAulaModal() {
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
  } = useCreateAula();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        Agregar Aula
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Aula</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 py-4">
              <div className="grid gap-2">
                <Label htmlFor="codigoAula">Codigo de Aula</Label>
                <Input id="codigoAula" {...register("codigoAula")} />
                {errors.codigoAula && (
                  <p className="text-red-500 text-xs">{errors.codigoAula.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="capacidad">Capacidad del Aula</Label>
                <Input id="capacidad" {...register("capacidad")} />
                {errors.capacidad && (
                  <p className="text-red-500 text-xs">{errors.capacidad.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input id="ubicacion" {...register("ubicacion")} />
                {errors.ubicacion && (
                  <p className="text-red-500 text-xs">{errors.ubicacion.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="equipamiento">Equipamiento</Label>
                <Input id="equipamiento" {...register("equipamiento")} />
                {errors.equipamiento && (
                  <p className="text-red-500 text-xs">{errors.equipamiento.message}</p>
                )}  
              </div>
              
              </div>
            <DialogFooter>
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
