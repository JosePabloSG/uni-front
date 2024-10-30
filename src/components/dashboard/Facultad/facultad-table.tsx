import { useGetAllFacultad } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditFacultadModal from "./edit-facultad-modal";
import DeleteFacultadModal from "./delete-facultad-modal";

export default function FacultadTable() {
  const { facultad, isLoading, isError, error } =
    useGetAllFacultad();

  if (isLoading) return <p>Cargando facultades...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facultad?.map((facultad) => (
            <TableRow key={facultad.idFacultad}>
              <TableCell>{facultad.idFacultad}</TableCell>
              <TableCell>{facultad.nombreFacultad}</TableCell>
              <TableCell>
                <EditFacultadModal
                  facultadId={facultad.idFacultad}
                  facultad={facultad}
                />
                <DeleteFacultadModal id={facultad.idFacultad} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}