import { useGetAllEstudiante } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditEstudianteModal from "./edit-estudiante-modal";
import DeleteEstudianteModal from "./delete-estudiante-modal";

export default function EstudianteTable() {
  const { estudiante, isLoading, isError, error } = useGetAllEstudiante();

  if (isLoading) return <p>Cargando estudiantes...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellidos</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estudiante?.map((estudiante) => (
            <TableRow key={estudiante.idEstudiante}>
              <TableCell>{estudiante.idEstudiante}</TableCell>
              <TableCell>{estudiante.nombre}</TableCell>
              <TableCell>{`${estudiante.apellido1} ${estudiante.apellido2}`}</TableCell>
              <TableCell>{estudiante.email}</TableCell>
              <TableCell>{estudiante.telefono}</TableCell>
              <TableCell>{estudiante.direccion}</TableCell>
              <TableCell>
                <EditEstudianteModal estudianteId={estudiante.idEstudiante!} estudiante={estudiante} />
                <DeleteEstudianteModal id={estudiante.idEstudiante!} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}