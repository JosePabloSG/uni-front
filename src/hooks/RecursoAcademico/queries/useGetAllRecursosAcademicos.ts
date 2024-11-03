import { getAllRecursosAcademicos } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllRecursosAcademicos = () => {
  const {
    data: recursosAcademicos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recursosAcademicos"],
    queryFn: getAllRecursosAcademicos,
  });

  return {
    recursosAcademicos,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllRecursosAcademicos;

