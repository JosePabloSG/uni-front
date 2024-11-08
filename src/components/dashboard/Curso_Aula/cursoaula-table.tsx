import { useGetAllAula, useGetAllCurso, useGetAllCursoAula } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeleteCursoAulaModal from "./delete-cursoaula-modal";
import EditCursoAulaModal from "./edit-cursoaula-modal";
import { format } from "@formkit/tempo";



export default function CursoAulaTable() {
  const {  isLoading, isError, error, cursoaula  } =
  useGetAllCursoAula();
  const { cursos } = useGetAllCurso();
  const { aula } = useGetAllAula();

  const formatDate = (dateString: string) =>
    format({
      date: new Date(dateString),
      format: "D MMMM YYYY HH:mm:ss", // Incluye hora, minutos y segundos
      locale: "es",
    });
 

  if (isLoading) return <p>Cargando niveles académicos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Horario de Clase</TableHead>
            <TableHead>ID Curso</TableHead>
            <TableHead>ID Aula</TableHead> 
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cursoaula?.map((cursoaula) => (
            <TableRow key={cursoaula.idCursoAula}>
              <TableCell>{cursoaula.idCursoAula}</TableCell>
              <TableCell>{formatDate(cursoaula.horarioClase)}</TableCell>
              <TableCell>{cursoaula.idCurso ? cursos?.find(c => c.idCurso === cursoaula.idCurso)?.nombre : cursoaula.idCurso}</TableCell>
              <TableCell>{cursoaula.idAula ? aula?.find(a => a.idAula === cursoaula.idAula)?.codigoAula : cursoaula.idAula}</TableCell>
              <TableCell>
                <EditCursoAulaModal
                  cursoaulaId={cursoaula.idAula}
                  cursoaula={cursoaula}
                />
                <DeleteCursoAulaModal id={cursoaula.idCursoAula} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
