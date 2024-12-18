"use client";

import AddCursoAulaModal from "@/components/dashboard/Curso_Aula/add-cursoaula-modal";
import CursoAulaTable from "@/components/dashboard/Curso_Aula/cursoaula-table";
import AddCursoModal from "@/components/dashboard/Curso/add-curso-modal";
import CursoTable from "@/components/dashboard/Curso/curso-table";
import AddHorarioModal from "@/components/dashboard/Horario/add-horario-modal";
import HorarioTable from "@/components/dashboard/Horario/horario-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocenteCursoTable from "@/components/dashboard/DocenteCurso/docente-curso-table";
import AddDocenteCursoModal from "@/components/dashboard/DocenteCurso/add-docente-curso-modal";

export default function GestionCursos() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="cursos">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cursos">Cursos</TabsTrigger>
          <TabsTrigger value="horarios">Horarios</TabsTrigger>
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
        <TabsContent value="horarios">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Horarios</h2>
             <AddHorarioModal />
             <HorarioTable />
          </div>
        </TabsContent>
        <TabsContent value="docentes-cursos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Docentes Cursos</h2>
            <AddDocenteCursoModal />
            <DocenteCursoTable />
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
