"use client";

import AddAulaModal from "@/components/dashboard/Aula/add-aula-modal";
import AulaTable from "@/components/dashboard/Aula/aula-table";
import AddCursoRecursoAcademicoModal from "@/components/dashboard/CursoRecursoAcademico/add-curso-recurso-academico-modal";
import CursoRecursoAcademicoTable from "@/components/dashboard/CursoRecursoAcademico/curso-recurso-academico-table";
import AddRecursoAcademicoModal from "@/components/dashboard/RecursoAcademico/add-recurso-academico-modal";
import RecursoAcademicoTable from "@/components/dashboard/RecursoAcademico/recurso-academico.table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GestionAcademica() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Tabs defaultValue="Aulas">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Aulas">
            Aulas
          </TabsTrigger>
          <TabsTrigger value="Recursos Académicos">
            Recursos Académicos
          </TabsTrigger>
          <TabsTrigger value="Cursos-Recursos Académicos">
            Cursos-Recursos Académicos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Aulas">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Aulas</h2>
            <AddAulaModal />
            <AulaTable />
          </div>
        </TabsContent>
        <TabsContent value="Recursos Académicos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Recursos Académicos</h2>
            <AddRecursoAcademicoModal />
            <RecursoAcademicoTable />
          </div>
        </TabsContent>
        <TabsContent value="Cursos-Recursos Académicos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Cursos-Recursos Académicos
            </h2>
            <AddCursoRecursoAcademicoModal />
            <CursoRecursoAcademicoTable />
          </div>
        </TabsContent>
       
      </Tabs>
    </div>
  );
}


// aulas
// Recursos Académicos
// Cursos-Recursos Académicos

