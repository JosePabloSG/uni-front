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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Estudiante {
  Id_Estudiante: number
  Nombre: string
  Apellido1: string
  Apellido2: string
  Telefono: string
  Email: string
  Direccion: string
}

interface Docente {
  Id_Docente: number
  Nombre: string
  Apellido1: string
  Apellido2: string
  Email: string
  Especialidad: string
  Telefono: string
}

interface Inscripcion {
  Id_Inscripcion: number
  Fecha_Inscripcion: string
  Estado: string
  Id_Curso: number
  Id_Estudiante: number
}

export default function GestionEstudiantesDocentes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    {
      Id_Estudiante: 1,
      Nombre: "Juan",
      Apellido1: "Pérez",
      Apellido2: "Rodríguez",
      Telefono: "8888-1234",
      Email: "juan.perez@example.com",
      Direccion: "San José, Costa Rica"
    },
    {
      Id_Estudiante: 2,
      Nombre: "María",
      Apellido1: "González",
      Apellido2: "López",
      Telefono: "8899-5678",
      Email: "maria.gonzalez@example.com",
      Direccion: "Heredia, Costa Rica"
    }
  ])

  const [docentes, setDocentes] = useState<Docente[]>([
    {
      Id_Docente: 1,
      Nombre: "Carlos",
      Apellido1: "Fernández",
      Apellido2: "Jiménez",
      Email: "carlos.fernandez@example.com",
      Especialidad: "Ingeniería de Software",
      Telefono: "8888-1111"
    },
    {
      Id_Docente: 2,
      Nombre: "Ana",
      Apellido1: "Martínez",
      Apellido2: "Ramírez",
      Email: "ana.martinez@example.com",
      Especialidad: "Biología",
      Telefono: "8888-2222"
    }
  ])

  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([
    {
      Id_Inscripcion: 1,
      Fecha_Inscripcion: "2024-01-15",
      Estado: "Activa",
      Id_Curso: 1,
      Id_Estudiante: 1
    },
    {
      Id_Inscripcion: 2,
      Fecha_Inscripcion: "2024-02-20",
      Estado: "Pendiente",
      Id_Curso: 2,
      Id_Estudiante: 2
    }
  ])

  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [newItem, setNewItem] = useState<any>({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("estudiantes")

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    if (editingItem) {
      switch (activeTab) {
        case "estudiantes":
          setEstudiantes(estudiantes.map(e => e.Id_Estudiante === editingItem.Id_Estudiante ? editingItem : e))
          break
        case "docentes":
          setDocentes(docentes.map(d => d.Id_Docente === editingItem.Id_Docente ? editingItem : d))
          break
        case "inscripciones":
          setInscripciones(inscripciones.map(i => i.Id_Inscripcion === editingItem.Id_Inscripcion ? editingItem : i))
          break
      }
      setIsEditModalOpen(false)
      setEditingItem(null)
    }
  }

  const handleDelete = (id: number) => {
    switch (activeTab) {
      case "estudiantes":
        setEstudiantes(estudiantes.filter(e => e.Id_Estudiante !== id))
        break
      case "docentes":
        setDocentes(docentes.filter(d => d.Id_Docente !== id))
        break
      case "inscripciones":
        setInscripciones(inscripciones.filter(i => i.Id_Inscripcion !== id))
        break
    }
  }

  const handleAdd = () => {
    switch (activeTab) {
      case "estudiantes":
        const newEstudianteId = Math.max(...estudiantes.map(e => e.Id_Estudiante)) + 1
        setEstudiantes([...estudiantes, { ...newItem, Id_Estudiante: newEstudianteId }])
        break
      case "docentes":
        const newDocenteId = Math.max(...docentes.map(d => d.Id_Docente)) + 1
        setDocentes([...docentes, { ...newItem, Id_Docente: newDocenteId }])
        break
      case "inscripciones":
        const newInscripcionId = Math.max(...inscripciones.map(i => i.Id_Inscripcion)) + 1
        setInscripciones([...inscripciones, { ...newItem, Id_Inscripcion: newInscripcionId }])
        break
    }
    setIsAddModalOpen(false)
    setNewItem({})
  }

  const renderTable = () => {
    switch (activeTab) {
      case "estudiantes":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estudiantes.map((estudiante) => (
                <TableRow key={estudiante.Id_Estudiante}>
                  <TableCell>{estudiante.Id_Estudiante}</TableCell>
                  <TableCell>{estudiante.Nombre}</TableCell>
                  <TableCell>{`${estudiante.Apellido1} ${estudiante.Apellido2}`}</TableCell>
                  <TableCell>{estudiante.Telefono}</TableCell>
                  <TableCell>{estudiante.Email}</TableCell>
                  <TableCell>{estudiante.Direccion}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(estudiante)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(estudiante.Id_Estudiante)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case "docentes":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docentes.map((docente) => (
                <TableRow key={docente.Id_Docente}>
                  <TableCell>{docente.Id_Docente}</TableCell>
                  <TableCell>{docente.Nombre}</TableCell>
                  <TableCell>{`${docente.Apellido1} ${docente.Apellido2}`}</TableCell>
                  <TableCell>{docente.Email}</TableCell>
                  <TableCell>{docente.Especialidad}</TableCell>
                  <TableCell>{docente.Telefono}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(docente)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(docente.Id_Docente)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case "inscripciones":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha de Inscripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>ID Curso</TableHead>
                <TableHead>ID Estudiante</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inscripciones.map((inscripcion) => (
                <TableRow key={inscripcion.Id_Inscripcion}>
                  <TableCell>{inscripcion.Id_Inscripcion}</TableCell>
                  <TableCell>{inscripcion.Fecha_Inscripcion}</TableCell>
                  <TableCell>{inscripcion.Estado}</TableCell>
                  <TableCell>{inscripcion.Id_Curso}</TableCell>
                  <TableCell>{inscripcion.Id_Estudiante}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(inscripcion)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(inscripcion.Id_Inscripcion)}>
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
      case "estudiantes":
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
              <Label htmlFor="apellido1" className="text-right">
                Primer Apellido
              </Label>
              <Input
                id="apellido1"
                value={editingItem?.Apellido1 || ""}
                onChange={(e) => setEditingItem({...editingItem, Apellido1: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apellido2" className="text-right">
                Segundo Apellido
              </Label>
              <Input
                id="apellido2"
                value={editingItem?.Apellido2 || ""}
                onChange={(e) => setEditingItem({...editingItem, Apellido2: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="telefono"
                value={editingItem?.Telefono || ""}
                onChange={(e) => setEditingItem({...editingItem, Telefono: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={editingItem?.Email || ""}
                onChange={(e) => setEditingItem({...editingItem, Email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input
                id="direccion"
                value={editingItem?.Direccion || ""}
                onChange={(e) => setEditingItem({...editingItem, Direccion: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
        )
      case "docentes":
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
              <Label htmlFor="apellido1" className="text-right">
                Primer Apellido
              </Label>
              <Input
                
                id="apellido1"
                value={editingItem?.Apellido1 || ""}
                onChange={(e) => setEditingItem({...editingItem, Apellido1: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apellido2" className="text-right">
                Segundo Apellido
              </Label>
              <Input
                id="apellido2"
                value={editingItem?.Apellido2 || ""}
                onChange={(e) => setEditingItem({...editingItem, Apellido2: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={editingItem?.Email || ""}
                onChange={(e) => setEditingItem({...editingItem, Email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="especialidad" className="text-right">
                Especialidad
              </Label>
              <Input
                id="especialidad"
                value={editingItem?.Especialidad || ""}
                onChange={(e) => setEditingItem({...editingItem, Especialidad: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="telefono"
                value={editingItem?.Telefono || ""}
                onChange={(e) => setEditingItem({...editingItem, Telefono: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
        )
      case "inscripciones":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha" className="text-right">
                Fecha de Inscripción
              </Label>
              <Input
                id="fecha"
                type="date"
                value={editingItem?.Fecha_Inscripcion || ""}
                onChange={(e) => setEditingItem({...editingItem, Fecha_Inscripcion: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estado" className="text-right">
                Estado
              </Label>
              <Select
                value={editingItem?.Estado || ""}
                onValueChange={(value) => setEditingItem({...editingItem, Estado: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activa">Activa</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="idEstudiante" className="text-right">
                ID Estudiante
              </Label>
              <Input
                id="idEstudiante"
                type="number"
                value={editingItem?.Id_Estudiante || ""}
                onChange={(e) => setEditingItem({...editingItem, Id_Estudiante: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
        )
    }
  }

  const renderAddModal = () => {
    switch (activeTab) {
      case "estudiantes":
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
              <Label htmlFor="newApellido1" className="text-right">
                Primer Apellido
              </Label>
              <Input
                id="newApellido1"
                value={newItem.Apellido1 || ""}
                onChange={(e) => setNewItem({...newItem, Apellido1: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newApellido2" className="text-right">
                Segundo Apellido
              </Label>
              <Input
                id="newApellido2"
                value={newItem.Apellido2 || ""}
                onChange={(e) => setNewItem({...newItem, Apellido2: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTelefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="newTelefono"
                value={newItem.Telefono || ""}
                onChange={(e) => setNewItem({...newItem, Telefono: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newEmail" className="text-right">
                Email
              </Label>
              <Input
                id="newEmail"
                type="email"
                value={newItem.Email || ""}
                onChange={(e) => setNewItem({...newItem, Email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newDireccion" className="text-right">
                Dirección
              </Label>
              <Input
                id="newDireccion"
                value={newItem.Direccion || ""}
                onChange={(e) => setNewItem({...newItem, Direccion: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
        )
      case "docentes":
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
              <Label htmlFor="newApellido1" className="text-right">
                Primer Apellido
              </Label>
              <Input
                id="newApellido1"
                value={newItem.Apellido1 || ""}
                onChange={(e) => setNewItem({...newItem, Apellido1: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newApellido2" className="text-right">
                Segundo Apellido
              </Label>
              <Input
                id="newApellido2"
                value={newItem.Apellido2 || ""}
                onChange={(e) => setNewItem({...newItem, Apellido2: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newEmail" className="text-right">
                Email
              </Label>
              <Input
                id="newEmail"
                type="email"
                value={newItem.Email || ""}
                onChange={(e) => setNewItem({...newItem, Email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newEspecialidad" className="text-right">
                Especialidad
              </Label>
              <Input
                id="newEspecialidad"
                value={newItem.Especialidad || ""}
                onChange={(e) => setNewItem({...newItem, Especialidad: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTelefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="newTelefono"
                value={newItem.Telefono || ""}
                onChange={(e) => setNewItem({...newItem, Telefono: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
        )
      case "inscripciones":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newFecha" className="text-right">
                Fecha de Inscripción
              </Label>
              <Input
                id="newFecha"
                type="date"
                value={newItem.Fecha_Inscripcion || ""}
                onChange={(e) => setNewItem({...newItem, Fecha_Inscripcion: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newEstado" className="text-right">
                Estado
              </Label>
              <Select
                value={newItem.Estado || ""}
                onValueChange={(value) => setNewItem({...newItem, Estado: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activa">Activa</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="newIdEstudiante" className="text-right">
                ID Estudiante
              </Label>
              <Input
                id="newIdEstudiante"
                type="number"
                value={newItem.Id_Estudiante || ""}
                onChange={(e) => setNewItem({...newItem, Id_Estudiante: parseInt(e.target.value)})}
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
          <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
          <TabsTrigger value="docentes">Docentes</TabsTrigger>
          <TabsTrigger value="inscripciones">Inscripciones</TabsTrigger>
        </TabsList>
        <TabsContent value="estudiantes">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Estudiantes</h2>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Agregar Estudiante
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Estudiante</DialogTitle>
                </DialogHeader>
                {renderAddModal()}
                <Button onClick={handleAdd}>Agregar Estudiante</Button>
              </DialogContent>
            </Dialog>
          </div>
          {renderTable()}
        </TabsContent>
        <TabsContent value="docentes">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Docentes</h2>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Agregar Docente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Docente</DialogTitle>
                </DialogHeader>
                {renderAddModal()}
                <Button onClick={handleAdd}>Agregar Docente</Button>
              </DialogContent>
            </Dialog>
          </div>
          {renderTable()}
        </TabsContent>
        <TabsContent value="inscripciones">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Inscripciones</h2>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Agregar Inscripción
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Inscripción</DialogTitle>
                </DialogHeader>
                {renderAddModal()}
                <Button onClick={handleAdd}>Agregar Inscripción</Button>
              </DialogContent>
            </Dialog>
          </div>
          {renderTable()}
        </TabsContent>
      </Tabs>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar {activeTab === "estudiantes" ? "Estudiante" : activeTab === "docentes" ? "Docente" : "Inscripción"}</DialogTitle>
          </DialogHeader>
          {renderEditModal()}
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}