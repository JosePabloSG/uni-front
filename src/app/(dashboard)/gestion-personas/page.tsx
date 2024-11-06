"use client";
import AddHistorialAcademicoModal from "@/components/dashboard/HistorialAcademico/add-historial-academico-modal";
import { HistorialAcademicoTable } from "@/components/dashboard/HistorialAcademico/historial-academico-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GestionAcademica() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Tabs defaultValue="estudiantes">
      <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
          <TabsTrigger value="docentes">Docentes</TabsTrigger>
          <TabsTrigger value="inscripciones">Inscripciones</TabsTrigger>
          <TabsTrigger value="historialAcademico">Historial Academico </TabsTrigger>
        </TabsList>
        <TabsContent value="estudiantes">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Estudiantes</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </TabsContent>
        <TabsContent value="inscripciones">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Inscripciones</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </TabsContent>
        <TabsContent value="docentes">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Docentes</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </TabsContent>
        <TabsContent value="historialAcademico">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Historial Academico</h2>
            <AddHistorialAcademicoModal />
            <HistorialAcademicoTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
