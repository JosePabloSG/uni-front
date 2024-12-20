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
import { useCreateCursoAula, useGetAllCurso, useGetAllAula } from "@/hooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ErrorModal from "@/components/ui/error-modal";


export default function AddCursoAulaModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isOpen,
    setIsOpen,
    errors,
    setValue,
    errorMessage,
    closeErrorModal,
  } = useCreateCursoAula();
  const { cursos } = useGetAllCurso();
  const { aula } = useGetAllAula();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        Agregar Curso Aula
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Curso Aula</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 py-4">
              <div className="grid gap-2">
                <Label htmlFor="horarioClase">Horario de clase</Label>
                <Input id="horarioClase" {...register("horarioClase")} />
                {errors.horarioClase && (
                  <p className="text-red-500 text-xs">{errors.horarioClase.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idAula">Aula</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("idAula", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un aula" />
                  </SelectTrigger>
                  <SelectContent>
                    {aula &&
                      aula.map((aulas) => (
                        <SelectItem
                          key={aulas?.idAula}
                          value={(aulas?.idAula ?? "").toString()}
                        >
                          {aulas?.codigoAula}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.idAula && (
                  <p className="text-red-500 text-xs">
                    {errors.idAula.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idCurso">Curso</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("idCurso", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {cursos &&
                      cursos.map((curso) => (
                        <SelectItem
                          key={curso?.idCurso}
                          value={(curso?.idCurso ?? "").toString()}
                        >
                          {curso?.nombre}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.idCurso && (
                  <p className="text-red-500 text-xs">
                    {errors.idCurso.message}
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
