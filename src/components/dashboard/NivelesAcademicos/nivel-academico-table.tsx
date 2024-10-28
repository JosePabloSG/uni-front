import { useGetAllNivelAcademico } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditNivelAcademicoModal from "./edit-nivel-academico-modal";
import DeleteNivelAcademicoModal from "./delete-nivel-academico-modal";

export default function NivelAcademicoTable() {
  const { nivelAcademicos, isLoading, isError, error } =
    useGetAllNivelAcademico();

  if (isLoading) return <p>Cargando niveles académicos...</p>;
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
          {nivelAcademicos?.map((nivel) => (
            <TableRow key={nivel.idNivelAcademico}>
              <TableCell>{nivel.idNivelAcademico}</TableCell>
              <TableCell>{nivel.nombreNivelAcademico}</TableCell>
              <TableCell>
                <EditNivelAcademicoModal
                  nivelId={nivel.idNivelAcademico}
                  nivel={nivel}
                />
                <DeleteNivelAcademicoModal id={nivel.idNivelAcademico} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
