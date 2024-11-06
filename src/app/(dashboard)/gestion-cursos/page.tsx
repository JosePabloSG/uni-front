"use client";
import AddCursoModal from "@/components/dashboard/Curso/add-curso-modal";
import CursoTable from "@/components/dashboard/Curso/curso-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GestionCursos() {
  return (
    <div className="container mx-auto p-4">
      <Tabs>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cursos">Cursos</TabsTrigger>
          <TabsTrigger value="docentes-cursos">Docentes-Cursos</TabsTrigger>
          <TabsTrigger value="cursos-aulas">Cursos-Aulas</TabsTrigger>
        </TabsList>
        <TabsContent value="cursos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Cursos</h2>
            <AddCursoModal />
            <CursoTable />
          </div>
        </TabsContent>
        <TabsContent value="docentes-cursos"></TabsContent>
        <TabsContent value="cursos-aulas"></TabsContent>
      </Tabs>
    </div>
  );
}
