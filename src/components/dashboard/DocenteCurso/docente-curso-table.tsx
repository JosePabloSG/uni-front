import {
  useGetAllCurso,
  useGetAllDocente,
  useGetAllDocenteCurso,
} from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditDocenteCursoModal from "./edit-docente-curso-modal";
import DeleteDocenteCursoModal from "./delete-docente-curso-modal";
export default function DocenteCursoTable() {
  const { docenteCurso, isLoading, isError, error } = useGetAllDocenteCurso();
  const { cursos } = useGetAllCurso();
  const { docente } = useGetAllDocente();

  if (isLoading) return <p>Cargando docentes...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>ID Docente</TableHead>
            <TableHead>ID Curso</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docenteCurso?.map((docenteCurso) => (
            <TableRow key={docenteCurso.idDocenteCurso}>
              <TableCell>{docenteCurso.idDocenteCurso}</TableCell>
              <TableCell>
                {docente?.find(d => d.idDocente === docenteCurso.idDocente)?.nombreCompletoDocente || docenteCurso.idDocente}
              </TableCell>
              <TableCell>
                {cursos?.find(c => c.idCurso === docenteCurso.idCurso)?.nombre || docenteCurso.idCurso}
              </TableCell>
              <TableCell>
                <EditDocenteCursoModal
                  docenteCursoId={docenteCurso.idDocenteCurso!}
                  docenteCurso={docenteCurso}
                />
                <DeleteDocenteCursoModal id={docenteCurso.idDocenteCurso!} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
