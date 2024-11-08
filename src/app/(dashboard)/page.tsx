"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import {
  useGetAllDimEstudiante,
  useGetAllHechosDesempeñoAcademico,
  useGetAllDimDocente,
  useGetAllHechosCargaDocente,
  useGetAllHechosInscripcion,
  useGetAllDimTiempo,
  useGetAllDimCurso,
  useGetAllHechosSatisfaccionEstudiantes,
  useGetAllDimRecursoAcademico,
  useGetAllHechosUsoRecurso,
} from "@/hooks/warehouse/warehouse";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function UniversidadDashboard() {
  // Obtener datos usando los hooks
  const { dimEstudiante } = useGetAllDimEstudiante();
  const { hechosDesempeñoAcademico } = useGetAllHechosDesempeñoAcademico();
  const { dimDocente } = useGetAllDimDocente();
  const { hechosCargaDocente } = useGetAllHechosCargaDocente();
  const { hechosInscripcion } = useGetAllHechosInscripcion();
  const { dimTiempo } = useGetAllDimTiempo();
  const { dimCurso } = useGetAllDimCurso();
  const { hechosSatisfaccionEstudiantes } = useGetAllHechosSatisfaccionEstudiantes();
  const { dimRecursoAcademico } = useGetAllDimRecursoAcademico();
  const { hechosUsoRecurso } = useGetAllHechosUsoRecurso();

  // Estados para los gráficos y totales
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
  const [totalEstudiantes, setTotalEstudiantes] = useState(0);
  const [totalCursos, setTotalCursos] = useState(0);
  const [promedioGeneral, setPromedioGeneral] = useState(0);
  const [satisfaccionPromedio, setSatisfaccionPromedio] = useState(0);

  useEffect(() => {
    // Verifica si los datos están cargados
    if (
      dimEstudiante &&
      hechosDesempeñoAcademico &&
      dimTiempo &&
      dimCurso &&
      hechosInscripcion
    ) {
      // Desempeño Académico
      const desempeñoData = dimEstudiante.map((estudiante) => {
        const notasEstudiante = hechosDesempeñoAcademico.filter(
          (hecho) => hecho.idEstudiante === estudiante.idEstudiante
        );
        const promedio =
          notasEstudiante.reduce((acc, curr) => acc + (curr.nota || 0), 0) /
          (notasEstudiante.length || 1);

        return {
          nombre: `${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}`,
          promedio: parseFloat(promedio.toFixed(2)) || 0,
        };
      });
      setDesempenoAcademico(desempeñoData);

      // Tendencia de Inscripciones
      const inscripcionesPorFecha = hechosInscripcion.reduce(
        (acc, inscripcion) => {
          const fecha = dimTiempo.find(
            (tiempo) => tiempo.idTiempo === inscripcion.idTiempo
          )?.fecha;
          if (fecha) {
            acc[fecha] =
              (acc[fecha] || 0) +
              (inscripcion.cantidadInscripción || 0);
          }
          return acc;
        },
        {} as Record<string, number>
      );
      const tendenciaData = Object.entries(inscripcionesPorFecha).map(
        ([fecha, cantidad]) => ({
          fecha,
          cantidad,
        })
      );
      setInscripcionesTendencia(tendenciaData);

      // Total Estudiantes
      setTotalEstudiantes(dimEstudiante.length);

      // Total Cursos
      setTotalCursos(dimCurso.length);

      // Promedio General
      const totalNotas = hechosDesempeñoAcademico.reduce(
        (acc, curr) => acc + (curr.nota || 0),
        0
      );
      const promedioGeneral =
        totalNotas / (hechosDesempeñoAcademico.length || 1) || 0;
      setPromedioGeneral(parseFloat(promedioGeneral.toFixed(2)));
    }
  }, [
    dimEstudiante,
    hechosDesempeñoAcademico,
    hechosInscripcion,
    dimTiempo,
    dimCurso,
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Universidad Innovación y Conocimiento
      </h1>

      <Tabs defaultValue="desempeno" className="space-y-4">
        <TabsList>
          <TabsTrigger value="desempeno">Desempeño Académico</TabsTrigger>
          <TabsTrigger value="inscripciones">Inscripciones</TabsTrigger>
        </TabsList>

        <TabsContent value="desempeno">
          <Card>
            <CardHeader>
              <CardTitle>Desempeño Académico de Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
              {desempenoAcademico.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={desempenoAcademico}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="promedio" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p>No hay datos disponibles para mostrar.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inscripciones">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Inscripciones</CardTitle>
            </CardHeader>
            <CardContent>
              {inscripcionesTendencia.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={inscripcionesTendencia}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cantidad" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p>No hay datos disponibles para mostrar.</p>
              )}
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
            <div className="text-2xl font-bold">{totalEstudiantes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCursos}</div>
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
            <div className="text-2xl font-bold">{promedioGeneral}</div>
          </CardContent>
        </Card>
        {/* Puedes agregar más tarjetas aquí si lo deseas */}
      </div>
    </div>
  );
}
