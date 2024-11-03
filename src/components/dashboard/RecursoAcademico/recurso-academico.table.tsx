import { useGetAllRecursosAcademicos } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditRecursoAcademicoModal from "./edit-recurso-academico-modal";
import DeleteRecursoAcademicoModal from "./delete-recurso-academico-modal";

export default function RecursoAcademicoTable() {
  const { recursosAcademicos, isLoading, isError, error } =
    useGetAllRecursosAcademicos();

  if (isLoading) return <p>Cargando recursos académicos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recursosAcademicos?.map((recursoAcademico) => (
            <TableRow key={recursoAcademico.idRecursoAcademico}>
              <TableCell>{recursoAcademico.idRecursoAcademico}</TableCell>
              <TableCell>{recursoAcademico.estado}</TableCell>
              <TableCell>{recursoAcademico.tipo}</TableCell>
              <TableCell>
                {recursoAcademico.idRecursoAcademico !== undefined && (
                  <>
                    <EditRecursoAcademicoModal
                      recursoAcademicoId={recursoAcademico.idRecursoAcademico}
                      recursoAcademico={recursoAcademico}
                    />
                    <DeleteRecursoAcademicoModal
                      id={recursoAcademico.idRecursoAcademico}
                    />
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
