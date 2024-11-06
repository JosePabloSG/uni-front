import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllHistorialAcademico } from "@/hooks";

import React, { useState } from "react";
import EditHistorialAcademicoModal from "./edit-historial-academico-modal";
import DeleteHistorialAcademicoModal from "./delete-historial-academico-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ChevronDown, ChevronUp, GraduationCap, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HistorialAcademicoTable = () => {
  
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const { HistorialAcademico, isLoading, isError, error } =
    useGetAllHistorialAcademico();

  if (isLoading) return <p>Cargando historiales académicos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  

    const toggleRowExpansion = (id: number) => {
      setExpandedRows(prev => 
        prev.includes(id) 
          ? prev.filter(rowId => rowId !== id)
          : [...prev, id]
      )
    }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Nota</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Estudiante</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {HistorialAcademico.map((historial) => (
            <>
              <TableRow key={historial.idHistorialAcademico}>
                <TableCell>{historial.idHistorialAcademico}</TableCell>
                <TableCell>{historial.fechaCalificacion}</TableCell>
                <TableCell>{historial.nota}</TableCell>
                <TableCell>{historial.nombreCurso}</TableCell>
                <TableCell>{historial.nombreCompletoEstudiante}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRowExpansion(historial.idHistorialAcademico)}
                    >
                      {expandedRows.includes(historial.idHistorialAcademico) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <EditHistorialAcademicoModal
                  historialAcademicoId={historial.idHistorialAcademico}
                  historial={historial}
                />
                <DeleteHistorialAcademicoModal
                  id={historial.idHistorialAcademico}
                />
                  </div>
                </TableCell>
              </TableRow>
              {expandedRows.includes(historial.idHistorialAcademico) && (
                <TableRow>
                  <TableCell colSpan={6} className="p-0">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 bg-muted/50">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="font-bold text-base">Información del Estudiante</CardTitle>
                          <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <p><span className="font-medium">Email:</span> {historial.emailEstudiante}</p>
                            <p><span className="font-medium">Teléfono:</span> {historial.telefonoEstudiante}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="font-bold text-base">Información Académica</CardTitle>
                          <Book className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <p><span className="font-medium">Programa:</span> {historial.nombrePrograma}</p>
                            <p><span className="font-medium">Facultad:</span> {historial.nombreFacultad}</p>
                            <p><span className="font-medium">Curso:</span> {historial.nombreCurso}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="font-bold text-base ">Información del Docente</CardTitle>
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <p><span className="font-medium">Nombre:</span> {historial.nombreCompletoDocente}</p>
                            <p><span className="font-medium">ID:</span> {historial.idDocente}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
