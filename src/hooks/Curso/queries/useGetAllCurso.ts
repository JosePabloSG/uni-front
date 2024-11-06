import { getAllCurso } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllCurso = () => {
  const {
    data: cursos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cursos"],
    queryFn: getAllCurso,
  });

  return {
    cursos,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllCurso;