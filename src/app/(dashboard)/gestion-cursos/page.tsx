"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Curso {
  Id_Curso: number
  Nombre: string
  Codigo_Curso: string
  Creditos: number
  Horas_Semana: number
  Id_Prog_Academico: number
}

interface DocenteCurso {
  Id_Docente_Curso: number
  Id_Curso: number
  Id_Docente: number
}

interface CursoAula {
  Id_Curso_Aula: number
  Horario_clase: string
  Id_Curso: number
  Id_Aula: number
}

export default function GestionCursos() {
  const [cursos, setCursos] = useState<Curso[]>([
    {
      Id_Curso: 1,
      Nombre: "Algoritmos y Programación",
      Codigo_Curso: "CS101",
      Creditos: 4,
      Horas_Semana: 6,
      Id_Prog_Academico: 1
    },
    {
      Id_Curso: 2,
      Nombre: "Biología Molecular",
      Codigo_Curso: "BIO201",
      Creditos: 3,
      Horas_Semana: 4,
      Id_Prog_Academico: 2
    }
  ])

  const [docentesCursos, setDocentesCursos] = useState<DocenteCurso[]>([
    {
      Id_Docente_Curso: 1,
      Id_Curso: 1,
      Id_Docente: 1
    },
    {
      Id_Docente_Curso: 2,
      Id_Curso: 2,
      Id_Docente: 2
    }
  ])

  const [cursosAulas, setCursosAulas] = useState<CursoAula[]>([
    {
      Id_Curso_Aula: 1,
      Horario_clase: "2024-01-20T08:00:00",
      Id_Curso: 1,
      Id_Aula: 1
    },
    {
      Id_Curso_Aula: 2,
      Horario_clase: "2024-02-10T10:00:00",
      Id_Curso: 2,
      Id_Aula: 2
    }
  ])

  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [newItem, setNewItem] = useState<any>({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("cursos")

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    if (editingItem) {
      switch (activeTab) {
        case "cursos":
          setCursos(cursos.map(c => c.Id_Curso === editingItem.Id_Curso ? editingItem : c))
          break
        case "docentes-cursos":
          setDocentesCursos(docentesCursos.map(dc => dc.Id_Docente_Curso === editingItem.Id_Docente_Curso ? editingItem : dc))
          break
        case "cursos-aulas":
          setCursosAulas(cursosAulas.map(ca => ca.Id_Curso_Aula === editingItem.Id_Curso_Aula ? editingItem : ca))
          break
      }
      setIsEditModalOpen(false)
      setEditingItem(null)
    }
  }

  const handleDelete = (id: number) => {
    switch (activeTab) {
      case "cursos":
        setCursos(cursos.filter(c => c.Id_Curso !== id))
        break
      case "docentes-cursos":
        setDocentesCursos(docentesCursos.filter(dc => dc.Id_Docente_Curso !== id))
        break
      case "cursos-aulas":
        setCursosAulas(cursosAulas.filter(ca => ca.Id_Curso_Aula !== id))
        break
    }
  }

  const handleAdd = () => {
    switch (activeTab) {
      case "cursos":
        const newCursoId = Math.max(...cursos.map(c => c.Id_Curso)) + 1
        setCursos([...cursos, { ...newItem, Id_Curso: newCursoId }])
        break
      case "docentes-cursos":
        const newDocenteCursoId = Math.max(...docentesCursos.map(dc => dc.Id_Docente_Curso)) + 1
        setDocentesCursos([...docentesCursos, { ...newItem, Id_Docente_Curso: newDocenteCursoId }])
        break
      case "cursos-aulas":
        const newCursoAulaId = Math.max(...cursosAulas.map(ca => ca.Id_Curso_Aula)) + 1
        setCursosAulas([...cursosAulas, { ...newItem, Id_Curso_Aula: newCursoAulaId }])
        break
    }
    setIsAddModalOpen(false)
    setNewItem({})
  }

  const renderTable = () => {
    switch (activeTab) {
      case "cursos":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>Horas/Semana</TableHead>
                <TableHead>ID Programa</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cursos.map((curso) => (
                <TableRow key={curso.Id_Curso}>
                  <TableCell>{curso.Id_Curso}</TableCell>
                  <TableCell>{curso.Nombre}</TableCell>
                  <TableCell>{curso.Codigo_Curso}</TableCell>
                  <TableCell>{curso.Creditos}</TableCell>
                  <TableCell>{curso.Horas_Semana}</TableCell>
                  <TableCell>{curso.Id_Prog_Academico}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(curso)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(curso.Id_Curso)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case "docentes-cursos":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>ID Curso</TableHead>
                <TableHead>ID Docente</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docentesCursos.map((docenteCurso) => (
                <TableRow key={docenteCurso.Id_Docente_Curso}>
                  <TableCell>{docenteCurso.Id_Docente_Curso}</TableCell>
                  <TableCell>{docenteCurso.Id_Curso}</TableCell>
                  <TableCell>{docenteCurso.Id_Docente}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(docenteCurso)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(docenteCurso.Id_Docente_Curso)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case "cursos-aulas":
        return (
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
              {cursosAulas.map((cursoAula) => (
                <TableRow key={cursoAula.Id_Curso_Aula}>
                  <TableCell>{cursoAula.Id_Curso_Aula}</TableCell>
                  <TableCell>{new Date(cursoAula.Horario_clase).toLocaleString()}</TableCell>
                  <TableCell>{cursoAula.Id_Curso}</TableCell>
                  <TableCell>{cursoAula.Id_Aula}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(cursoAula)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(cursoAula.Id_Curso_Aula)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
    }
  }

  const renderEditModal = () => {
    switch (activeTab) {
      case "cursos":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={editingItem?.Nombre || ""}
                onChange={(e) => setEditingItem({...editingItem, Nombre: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="codigo" className="text-right">
                Código
              </Label>
              <Input
                id="codigo"
                value={editingItem?.Codigo_Curso || ""}
                onChange={(e) => setEditingItem({...editingItem, Codigo_Curso: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="creditos" className="text-right">
                Créditos
              </Label>
              <Input
                id="creditos"
                type="number"
                value={editingItem?.Creditos || ""}
                onChange={(e) => setEditingItem({...editingItem, Creditos: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="horas" className="text-right">
                Horas/Semana
              </Label>
              <Input
                id="horas"
                type="number"
                value={editingItem?.Horas_Semana || ""}
                onChange={(e) => setEditingItem({...editingItem, Horas_Semana: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="programa" className="text-right">
                ID Programa
              </Label>
              <Input
                id="programa"
                type="number"
                value={editingItem?.Id_Prog_Academico || ""}
                onChange={(e) => setEditingItem({...editingItem, Id_Prog_Academico: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
        )
      case "docentes-cursos":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idCurso" className="text-right">
                ID Curso
              </Label>
              <Input
                id="idCurso"
                type="number"
                value={editingItem?.Id_Curso || ""}
                onChange={(e) => setEditingItem({...editingItem, Id_Curso: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idDocente" className="text-right">
                ID Docente
              </Label>
              <Input
                id="idDocente"
                type="number"
                value={editingItem?.Id_Docente || ""}
                onChange={(e) => setEditingItem({...editingItem, Id_Docente: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
        )
      case "cursos-aulas":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="horario" className="text-right">
                Horario de Clase
              </Label>
              <Input
                id="horario"
                type="datetime-local"
                value={editingItem?.Horario_clase ? editingItem.Horario_clase.slice(0, 16) : ""}
                onChange={(e) => setEditingItem({...editingItem, Horario_clase: e.target.value})}
                
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idCurso" className="text-right">
                ID Curso
              </Label>
              <Input
                id="idCurso"
                type="number"
                value={editingItem?.Id_Curso || ""}
                onChange={(e) => setEditingItem({...editingItem, Id_Curso: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idAula" className="text-right">
                ID Aula
              </Label>
              <Input
                id="idAula"
                type="number"
                value={editingItem?.Id_Aula || ""}
                onChange={(e) => setEditingItem({...editingItem, Id_Aula: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
        )
    }
  }

  const renderAddModal = () => {
    switch (activeTab) {
      case "cursos":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newNombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="newNombre"
                value={newItem.Nombre || ""}
                onChange={(e) => setNewItem({...newItem, Nombre: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newCodigo" className="text-right">
                Código
              </Label>
              <Input
                id="newCodigo"
                value={newItem.Codigo_Curso || ""}
                onChange={(e) => setNewItem({...newItem, Codigo_Curso: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newCreditos" className="text-right">
                Créditos
              </Label>
              <Input
                id="newCreditos"
                type="number"
                value={newItem.Creditos || ""}
                onChange={(e) => setNewItem({...newItem, Creditos: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newHoras" className="text-right">
                Horas/Semana
              </Label>
              <Input
                id="newHoras"
                type="number"
                value={newItem.Horas_Semana || ""}
                onChange={(e) => setNewItem({...newItem, Horas_Semana: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPrograma" className="text-right">
                ID Programa
              </Label>
              <Input
                id="newPrograma"
                type="number"
                value={newItem.Id_Prog_Academico || ""}
                onChange={(e) => setNewItem({...newItem, Id_Prog_Academico: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
        )
      case "docentes-cursos":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newIdCurso" className="text-right">
                ID Curso
              </Label>
              <Input
                id="newIdCurso"
                type="number"
                value={newItem.Id_Curso || ""}
                onChange={(e) => setNewItem({...newItem, Id_Curso: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newIdDocente" className="text-right">
                ID Docente
              </Label>
              <Input
                id="newIdDocente"
                type="number"
                value={newItem.Id_Docente || ""}
                onChange={(e) => setNewItem({...newItem, Id_Docente: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
        )
      case "cursos-aulas":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newHorario" className="text-right">
                Horario de Clase
              </Label>
              <Input
                id="newHorario"
                type="datetime-local"
                value={newItem.Horario_clase || ""}
                onChange={(e) => setNewItem({...newItem, Horario_clase: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newIdCurso" className="text-right">
                ID Curso
              </Label>
              <Input
                id="newIdCurso"
                type="number"
                value={newItem.Id_Curso || ""}
                onChange={(e) => setNewItem({...newItem, Id_Curso: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newIdAula" className="text-right">
                ID Aula
              </Label>
              <Input
                id="newIdAula"
                type="number"
                value={newItem.Id_Aula || ""}
                onChange={(e) => setNewItem({...newItem, Id_Aula: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cursos">Cursos</TabsTrigger>
          <TabsTrigger value="docentes-cursos">Docentes-Cursos</TabsTrigger>
          <TabsTrigger value="cursos-aulas">Cursos-Aulas</TabsTrigger>
        </TabsList>
        <TabsContent value="cursos">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Cursos</h2>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Agregar Curso
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Curso</DialogTitle>
                </DialogHeader>
                {renderAddModal()}
                <Button onClick={handleAdd}>Agregar Curso</Button>
              </DialogContent>
            </Dialog>
          </div>
          {renderTable()}
        </TabsContent>
        <TabsContent value="docentes-cursos">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Docentes-Cursos</h2>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Agregar Relación
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Relación Docente-Curso</DialogTitle>
                </DialogHeader>
                {renderAddModal()}
                <Button onClick={handleAdd}>Agregar Relación</Button>
              </DialogContent>
            </Dialog>
          </div>
          {renderTable()}
        </TabsContent>
        <TabsContent value="cursos-aulas">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Cursos-Aulas</h2>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Agregar Horario
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Horario Curso-Aula</DialogTitle>
                </DialogHeader>
                {renderAddModal()}
                <Button onClick={handleAdd}>Agregar Horario</Button>
              </DialogContent>
            </Dialog>
          </div>
          {renderTable()}
        </TabsContent>
      </Tabs>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar {activeTab === "cursos" ? "Curso" : activeTab === "docentes-cursos" ? "Relación Docente-Curso" : "Horario Curso-Aula"}</DialogTitle>
          </DialogHeader>
          {renderEditModal()}
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}