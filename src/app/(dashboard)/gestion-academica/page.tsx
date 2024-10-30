"use client";
import AddFacultadModal from "@/components/dashboard/Facultad/add-facultad-modal";
import FacultadTable from "@/components/dashboard/Facultad/facultad-table";
import AddNivelAcademicoModal from "@/components/dashboard/NivelesAcademicos/add-nivel-academico-modal";
import NivelAcademicoTable from "@/components/dashboard/NivelesAcademicos/nivel-academico-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GestionAcademica() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Tabs defaultValue="Niveles Académicos">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Niveles Académicos">
            Niveles Académicos
          </TabsTrigger>
          <TabsTrigger value="Facultades">Facultades</TabsTrigger>
          <TabsTrigger value="Programas Académicos">
            Programas Académicos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Niveles Académicos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Niveles Académicos</h2>
            <AddNivelAcademicoModal />
            <NivelAcademicoTable />
          </div>
        </TabsContent>
        <TabsContent value="Facultades">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Facultades</h2>
           <AddFacultadModal />
           <FacultadTable />
          </div>
        </TabsContent>
        <TabsContent value="Programas Académicos">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Programas Académicos</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
