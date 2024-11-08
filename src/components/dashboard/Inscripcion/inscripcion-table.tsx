import React from "react";
import {
  useGetAllCurso,
  useGetAllEstudiante,
  useGetAllInscripcion,
} from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditInscripcionModal from "./edit-inscripcion-modal";
import DeleteInscripcionModal from "./delete-inscripcion-modal";

export default function InscripcionTable() {
  const { isLoading, isError, error, inscripcion } = useGetAllInscripcion();
  const { cursos } = useGetAllCurso();
  const { estudiante } = useGetAllEstudiante();

  if (isLoading) return <p>Cargando inscripciones...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha de Inscripción</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Estudiante</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inscripcion?.map((inscripcion) => (
            <TableRow key={inscripcion.idInscripcion}>
              <TableCell>{inscripcion.idInscripcion}</TableCell>
              <TableCell>{inscripcion.fechaInscripcion}</TableCell>
              <TableCell>{inscripcion.estado}</TableCell>
              <TableCell>{inscripcion.idCurso ? cursos?.find(c => c.idCurso === inscripcion.idCurso)?.nombre : inscripcion.idCurso}</TableCell>
              <TableCell>{inscripcion.idEstudiante ? estudiante?.find(e => e.idEstudiante === inscripcion.idEstudiante)?.nombre + " " + estudiante?.find(e => e.idEstudiante === inscripcion.idEstudiante)?.apellido1 + " " + estudiante?.find(e => e.idEstudiante === inscripcion.idEstudiante)?.apellido2 : inscripcion.idEstudiante}</TableCell>
              <TableCell>
                <EditInscripcionModal
                  inscripcionId={inscripcion.idInscripcion!}
                  inscripcion={inscripcion}
                />
                <DeleteInscripcionModal id={inscripcion.idInscripcion!} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
