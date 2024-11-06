import { getAllCursoRecursoAcademico } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllCursoRecursoAcademico = () => {
  const {
    data: cursoRecursoAcademicos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cursoRecursoAcademicos"],
    queryFn: getAllCursoRecursoAcademico,
  });

  return {
    cursoRecursoAcademicos,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllCursoRecursoAcademico;