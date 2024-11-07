import { useGetAllHorario } from "@/hooks";
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
  const { isLoading, isError, error, horario } = 
    useGetAllHorario();

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
            <TableHead>ID Docente</TableHead>
            <TableHead>ID Curso</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {horario?.map((horario) => (
            <TableRow key={horario.idHorario}>
              <TableCell>{horario.idHorario}</TableCell>
              <TableCell>{horario.fechaInicio}</TableCell>
              <TableCell>{horario.fechaFin}</TableCell>
              <TableCell>{horario.idDocente}</TableCell>
              <TableCell>{horario.idCurso}</TableCell>
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
