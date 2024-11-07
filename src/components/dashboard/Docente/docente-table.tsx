import { useGetAllDocente } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditDocenteModal from "./edit-docente-modal";
import DeleteDocenteModal from "./delete-docente-modal";

export default function DocenteTable() {
  const { docente, isLoading, isError, error } =
    useGetAllDocente();

  if (isLoading) return <p>Cargando docentes...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Especialidad</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docente?.map((docente) => (
            <TableRow key={docente.idDocente}>
              <TableCell>{docente.idDocente}</TableCell>
              <TableCell>{docente.nombreCompletoDocente}</TableCell>
              <TableCell>{docente.email}</TableCell>
              <TableCell>{docente.especialidad}</TableCell>
              <TableCell>{docente.direccion}</TableCell>
              <TableCell>{docente.telefono}</TableCell>
              <TableCell>
                <EditDocenteModal
                  docenteId={docente.idDocente}
                  docente={docente}
                />
                <DeleteDocenteModal id={docente.idDocente} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

