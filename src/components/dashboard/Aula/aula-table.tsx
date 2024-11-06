import { useGetAllAula } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteAulaModal from "./delete-aula-modal";
import EditAulaModal from "./edit-aula-modal";


export default function NivelAcademicoTable() {
  const {  isLoading, isError, error, aula  } =
    useGetAllAula();

  if (isLoading) return <p>Cargando niveles académicos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Codigo de Aula</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Equipamiento</TableHead>  
            <TableHead>Ubicación</TableHead>  
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aula?.map((aula) => (
            <TableRow key={aula.idAula}>
              <TableCell>{aula.idAula}</TableCell>
              <TableCell>{aula.codigoAula}</TableCell>
              <TableCell>{aula.capacidad}</TableCell>
              <TableCell>{aula.equipamiento}</TableCell>
              <TableCell>{aula.ubicacion}</TableCell>
              <TableCell>
                <EditAulaModal
                  aulaId={aula.idAula}
                  aula={aula}
                />
                <DeleteAulaModal id={aula.idAula} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
