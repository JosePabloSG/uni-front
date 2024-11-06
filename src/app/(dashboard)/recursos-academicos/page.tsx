"use client";
import AddAulaModal from "@/components/dashboard/Aula/add-aula-modal";
import AulaTable from "@/components/dashboard/Aula/aula-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GestionAcademica() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Tabs defaultValue="aulas">
      <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="aulas">Aulas</TabsTrigger>
          <TabsTrigger value="recursos">Recursos Académicos</TabsTrigger>
          <TabsTrigger value="cursos-recursos">Cursos-Recursos</TabsTrigger>
        </TabsList>
        <TabsContent value="aulas">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Aulas</h2>
            <AddAulaModal />
            <AulaTable />
          </div>
        </TabsContent>
        <TabsContent value="recursos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Recursos Académicos</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </TabsContent>
        <TabsContent value="cursos-recursos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Cursos-Recursos</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </TabsContent>
       
      </Tabs>
    </div>
  );
}
