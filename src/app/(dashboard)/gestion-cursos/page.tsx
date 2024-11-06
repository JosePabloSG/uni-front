"use client";
import AddCursoAulaModal from "@/components/dashboard/Curso_Aula/add-cursoaula-modal";
import CursoAulaTable from "@/components/dashboard/Curso_Aula/cursoaula-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GestionAcademica() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Tabs defaultValue="estudiantes">
      <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cursos">Cursos</TabsTrigger>
          <TabsTrigger value="docentes-cursos">Docentes-Cursos</TabsTrigger>
          <TabsTrigger value="cursos-aulas">Cursos-Aulas</TabsTrigger>
        </TabsList>

        <TabsContent value="cursos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Cursos</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </TabsContent>

        <TabsContent value="docentes-cursos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Docentes Cursos</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </TabsContent>
        
        <TabsContent value="cursos-aulas">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Curso Aulas</h2>
            <AddCursoAulaModal />
            <CursoAulaTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
