import { useGetAllCurso, useGetAllDocente, useGetAllHorario } from "@/hooks";
import { format } from '@formkit/tempo';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteHorarioModal from "./delete-horario-modal";
import EditHorarioModal from "./edit-horario-modal";

export default function HorarioTable() {
  const { isLoading, isError, error, horario } = useGetAllHorario();
  const { cursos } = useGetAllCurso();
  const { docente } = useGetAllDocente();

  const formatDate = (dateString: string) =>
    format({
      date: new Date(dateString),
      format: "D MMMM YYYY HH:mm:ss", // Incluye hora, minutos y segundos
      locale: "es",
    });

  if (isLoading) return <p>Cargando horarios...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead>Docente</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {horario?.map((horario) => (
            <TableRow key={horario.idHorario}>
              <TableCell>{horario.idHorario}</TableCell>
              <TableCell>{formatDate(horario.fechaInicio)}</TableCell>
              <TableCell>{formatDate(horario.fechaFin)}</TableCell>
              <TableCell>
                {horario.idDocente
                  ? docente?.find((d) => d.idDocente === horario.idDocente)
                      ?.nombreCompletoDocente
                  : horario.idDocente}
              </TableCell>
              <TableCell>
                {horario.idCurso
                  ? cursos?.find((c) => c.idCurso === horario.idCurso)?.nombre
                  : horario.idCurso}
              </TableCell>
              <TableCell>
                <EditHorarioModal
                  horarioId={horario.idHorario}
                  horario={horario}
                />
                <DeleteHorarioModal id={horario.idHorario} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
