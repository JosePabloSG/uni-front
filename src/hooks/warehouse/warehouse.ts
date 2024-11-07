import { dimAulaRepository, dimCursoRepository, dimDocenteRepository, dimEstudianteRepository, dimRecursoAcademicoRepository, dimTiempoRepository, hechosCargaDocenteRepository, hechosDesempeñoAcademicoRepository, hechosInscripcionRepository, hechosSatisfaccionEstudiantesRepository, hechosUsoRecursoRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";
export const useGetAllDimAula = () => {
  const {
    data: dimAula,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["DimAula"],
    queryFn: () => dimAulaRepository.getAll(),
  });

  return {
    dimAula,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllDimCurso = () => {
  const {
    data: dimCurso,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["DimCurso"],
    queryFn: () => dimCursoRepository.getAll(),
  });

  return {
    dimCurso,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllDimDocente = () => {
  const {
    data: dimDocente,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["DimDocente"],
    queryFn: () => dimDocenteRepository.getAll(),
  });

  return {
    dimDocente,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllDimEstudiante = () => {
  const {
    data: dimEstudiante,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["DimEstudiante"],
    queryFn: () => dimEstudianteRepository.getAll(),
  });

  return {
    dimEstudiante,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllDimRecursoAcademico = () => {
  const {
    data: dimRecursoAcademico,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["DimRecursoAcademico"],
    queryFn: () => dimRecursoAcademicoRepository.getAll(),
  });

  return {
    dimRecursoAcademico,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllDimTiempo = () => {
  const {
    data: dimTiempo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["DimTiempo"],
    queryFn: () => dimTiempoRepository.getAll(),
  });

  return {
    dimTiempo,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllHechosCargaDocente = () => {
  const {
    data: hechosCargaDocente,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["HechosCargaDocente"],
    queryFn: () => hechosCargaDocenteRepository.getAll(),
  });

  return {
    hechosCargaDocente,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllHechosDesempeñoAcademico = () => {
  const {
    data: hechosDesempeñoAcademico,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["HechosDesempeñoAcademico"],
    queryFn: () => hechosDesempeñoAcademicoRepository.getAll(),
  });

  return {
    hechosDesempeñoAcademico,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllHechosInscripcion = () => {
  const {
    data: hechosInscripcion,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["HechosInscripcion"],
    queryFn: () => hechosInscripcionRepository.getAll(),
  });

  return {
    hechosInscripcion,
    isLoading,
    isError,
    error,
  };
};  

export const useGetAllHechosSatisfaccionEstudiantes = () => {
  const {
    data: hechosSatisfaccionEstudiantes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["HechosSatisfaccionEstudiantes"],
    queryFn: () => hechosSatisfaccionEstudiantesRepository.getAll(),
  });

  return {
    hechosSatisfaccionEstudiantes,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllHechosUsoRecurso = () => {
  const {
    data: hechosUsoRecurso,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["HechosUsoRecurso"],
    queryFn: () => hechosUsoRecursoRepository.getAll(),
  });

  return {
    hechosUsoRecurso,
    isLoading,
    isError,
    error,
  };
};

  
