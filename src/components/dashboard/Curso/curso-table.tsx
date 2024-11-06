import { useGetAllCurso } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditCursoModal from "./edit-curso-modal";
import DeleteCursoModal from "./delete-curso-modal";

export default function CursoTable() {
  const { cursos, isLoading, isError, error } = useGetAllCurso();

  if (isLoading) return <p>Cargando cursos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Creditos</TableHead>
            <TableHead>Horas/Semana</TableHead>
            <TableHead>ID Programa</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cursos?.map((curso) => (
            <TableRow key={curso.idCurso}>
              <TableCell>{curso.idCurso}</TableCell>
              <TableCell>{curso.nombre}</TableCell>
              <TableCell>{curso.creditos}</TableCell>
              <TableCell>{curso.horasSemana}</TableCell>
              <TableCell>{curso.idProgAcademico}</TableCell>
              <TableCell>
                {curso.idCurso !== undefined && (
                  <>
                    <EditCursoModal cursoId={curso.idCurso} curso={curso} />
                    <DeleteCursoModal id={curso.idCurso} />
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
