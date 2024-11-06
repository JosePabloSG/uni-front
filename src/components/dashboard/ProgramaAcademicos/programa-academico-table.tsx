import { useGetAllProgramaAcademico } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProgramaAcademicoModal from "./edit-programa-academico-modal";
import DeleteProgramaAcademicoModal from "./delete-programa-academico-modal";

export default function ProgramaAcademicoTable() {
  const { programaAcademico, isLoading, isError, error } =
    useGetAllProgramaAcademico();

  if (isLoading) return <p>Cargando programas académicos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Duración</TableHead>
            <TableHead>Nivel Académico</TableHead>
            <TableHead>Facultad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programaAcademico?.map((programaAcademico) => (
            <TableRow key={programaAcademico.idProgAcademico}>
              <TableCell>{programaAcademico.idProgAcademico}</TableCell>
              <TableCell>{programaAcademico.nombrePrograma}</TableCell>
              <TableCell>{programaAcademico.duracion}</TableCell>
              <TableCell>{programaAcademico.nivelAcademico}</TableCell>
              <TableCell>{programaAcademico.nombreFacultad}</TableCell>
              <TableCell>
                {programaAcademico.idProgAcademico !== undefined && (
                  <>
                    <EditProgramaAcademicoModal
                      programaAcademicoId={programaAcademico.idProgAcademico}
                      programaAcademico={programaAcademico}
                    />
                    <DeleteProgramaAcademicoModal
                      id={programaAcademico.idProgAcademico}
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
