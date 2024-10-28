"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, BookOpen, School, Star } from "lucide-react";

type Estudiante = {
  Id_Estudiante: number;
  Nombre: string;
  Promedio: number;
};

type Docente = {
  Id_Docente: number;
  Nombre: string;
  CargaHoraria: number;
};

type Curso = {
  Id_Curso: number;
  Nombre: string;
  Inscripciones: number;
};

type Inscripcion = {
  Id_Inscripcion: number;
  Id_Curso: number;
  Id_Estudiante: number;
  Fecha: string;
};

type RecursoAcademico = {
  Id_Recurso: number;
  Nombre: string;
  Uso: number;
};

type Evaluacion = {
  Id_Evaluacion: number;
  Id_Curso: number;
  Calificacion: number;
};

// Datos de ejemplo (reemplazar con datos reales o fetch de API)
const estudiantes: Estudiante[] = [
  { Id_Estudiante: 1, Nombre: "Juan Pérez", Promedio: 8.5 },
  { Id_Estudiante: 2, Nombre: "María González", Promedio: 9.2 },
];

const docentes: Docente[] = [
  { Id_Docente: 1, Nombre: "Carlos Fernández", CargaHoraria: 20 },
  { Id_Docente: 2, Nombre: "Ana Martínez", CargaHoraria: 15 },
];

const cursos: Curso[] = [
  { Id_Curso: 1, Nombre: "Algoritmos", Inscripciones: 30 },
  { Id_Curso: 2, Nombre: "Biología", Inscripciones: 25 },
];

const inscripciones: Inscripcion[] = [
  { Id_Inscripcion: 1, Id_Curso: 1, Id_Estudiante: 1, Fecha: "2024-01-15" },
  { Id_Inscripcion: 2, Id_Curso: 2, Id_Estudiante: 2, Fecha: "2024-01-20" },
];

const recursosAcademicos: RecursoAcademico[] = [
  { Id_Recurso: 1, Nombre: "Aula 101", Uso: 80 },
  { Id_Recurso: 2, Nombre: "Laboratorio A", Uso: 65 },
];

const evaluaciones: Evaluacion[] = [
  { Id_Evaluacion: 1, Id_Curso: 1, Calificacion: 4.5 },
  { Id_Evaluacion: 2, Id_Curso: 2, Calificacion: 4.2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function UniversidadDashboard() {
  const [desempenoAcademico, setDesempenoAcademico] = useState<
    { nombre: string; promedio: number }[]
  >([]);
  const [cargaDocente, setCargaDocente] = useState<
    { nombre: string; carga: number }[]
  >([]);
  const [usoRecursos, setUsoRecursos] = useState<
    { nombre: string; uso: number }[]
  >([]);
  const [inscripcionesTendencia, setInscripcionesTendencia] = useState<
    { fecha: string; cantidad: number }[]
  >([]);
  const [satisfaccionEstudiantes, setSatisfaccionEstudiantes] = useState<
    { curso: string; calificacion: number }[]
  >([]);

  useEffect(() => {
    // Calcular desempeño académico
    setDesempenoAcademico(
      estudiantes.map((e) => ({ nombre: e.Nombre, promedio: e.Promedio }))
    );

    // Calcular carga docente
    setCargaDocente(
      docentes.map((d) => ({ nombre: d.Nombre, carga: d.CargaHoraria }))
    );

    // Calcular uso de recursos
    setUsoRecursos(
      recursosAcademicos.map((r) => ({ nombre: r.Nombre, uso: r.Uso }))
    );

    // Calcular tendencia de inscripciones
    const inscripcionesPorFecha = inscripciones.reduce((acc, ins) => {
      acc[ins.Fecha] = (acc[ins.Fecha] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    setInscripcionesTendencia(
      Object.entries(inscripcionesPorFecha).map(([fecha, cantidad]) => ({
        fecha,
        cantidad,
      }))
    );

    // Calcular satisfacción de estudiantes
    setSatisfaccionEstudiantes(
      evaluaciones.map((e) => {
        const curso = cursos.find((c) => c.Id_Curso === e.Id_Curso);
        return {
          curso: curso?.Nombre || "Desconocido",
          calificacion: e.Calificacion,
        };
      })
    );
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Universidad Innovación y Conocimiento
      </h1>

      <Tabs defaultValue="desempeno" className="space-y-4">
        <TabsList>
          <TabsTrigger value="desempeno">Desempeño Académico</TabsTrigger>
          <TabsTrigger value="docentes">Carga Docente</TabsTrigger>
          <TabsTrigger value="recursos">Uso de Recursos</TabsTrigger>
          <TabsTrigger value="inscripciones">Inscripciones</TabsTrigger>
          <TabsTrigger value="satisfaccion">Satisfacción</TabsTrigger>
        </TabsList>

        <TabsContent value="desempeno">
          <Card>
            <CardHeader>
              <CardTitle>Desempeño Académico de Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={desempenoAcademico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="promedio" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docentes">
          <Card>
            <CardHeader>
              <CardTitle>Carga de Trabajo del Personal Docente</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cargaDocente}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="carga" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recursos">
          <Card>
            <CardHeader>
              <CardTitle>Uso de Recursos Académicos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={usoRecursos}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="uso"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {usoRecursos.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inscripciones">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Inscripciones</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={inscripcionesTendencia}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cantidad" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaccion">
          <Card>
            <CardHeader>
              <CardTitle>Satisfacción de los Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={satisfaccionEstudiantes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="curso" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calificacion" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Estudiantes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estudiantes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cursos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Promedio General
            </CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                estudiantes.reduce((acc, est) => acc + est.Promedio, 0) /
                estudiantes.length
              ).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Satisfacción Promedio
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                evaluaciones.reduce(
                  (acc, evaluacion) => acc + evaluacion.Calificacion,
                  0
                ) / evaluaciones.length
              ).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
