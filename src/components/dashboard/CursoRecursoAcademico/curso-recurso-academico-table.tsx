import { useGetAllCurso, useGetAllCursoRecursoAcademico, useGetAllRecursosAcademicos } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditCursoRecursoAcademicoModal from "./edit-curso-recurso-academico-modal";
import DeleteCursoRecursoAcademicoModal from "./delete-curso-recurso-academico-modal";

export default function CursoRecursoAcademicoTable() {
  const { cursoRecursoAcademicos, isLoading, isError, error } =
    useGetAllCursoRecursoAcademico();
  const { cursos } = useGetAllCurso();
  const { recursosAcademicos } = useGetAllRecursosAcademicos();

  if (isLoading) return <p>Cargando cursos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Recurso Académico</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cursoRecursoAcademicos?.map((cursoRecursoAcademico) => (
            <TableRow key={cursoRecursoAcademico.idCursoRecAcademico}>
              <TableCell>{cursoRecursoAcademico.idCursoRecAcademico}</TableCell>
              <TableCell>
                {cursos?.find(curso => curso.idCurso === cursoRecursoAcademico.idCurso)?.nombre}
              </TableCell>
              <TableCell>
                {recursosAcademicos?.find(recurso => recurso.idRecursoAcademico === cursoRecursoAcademico.idRecursoAcademico)?.tipo}
              </TableCell>
              <TableCell>
                {cursoRecursoAcademico.idCursoRecAcademico !== undefined && (
                  <>
                    <EditCursoRecursoAcademicoModal
                      cursoRecursoAcademicoId={
                        cursoRecursoAcademico.idCursoRecAcademico
                      }
                      cursoRecursoAcademico={cursoRecursoAcademico}
                    />
                    <DeleteCursoRecursoAcademicoModal
                      id={cursoRecursoAcademico.idCursoRecAcademico}
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
